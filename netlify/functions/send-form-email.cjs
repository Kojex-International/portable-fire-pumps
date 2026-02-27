const RESEND_API_URL = "https://api.resend.com/emails";
const HIDDEN_KEYS = new Set(["form-name", "bot-field"]);

const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  organization: "Organization Name",
  industry: "Organization Type",
  services: "What Do You Need",
  timeline: "Purchase Timeline",
  volume: "Estimated Quantity",
  details: "Inquiry Details",
};

const FIELD_SECTIONS = [
  { title: "Contact Information", keys: ["firstName", "lastName", "email", "phone"] },
  { title: "Organization Information", keys: ["organization", "industry"] },
  { title: "Inquiry Information", keys: ["services", "timeline", "volume", "details"] },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizePayload(event) {
  const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
  const body = event.body || "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(body);
    const data = {};
    for (const [key, value] of params.entries()) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const existing = data[key];
        data[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
      } else {
        data[key] = value;
      }
    }
    return {
      formName: data["form-name"] || "pump-inquiry",
      data,
    };
  }

  if (contentType.includes("application/json")) {
    const parsed = JSON.parse(body || "{}");
    const payload = parsed.payload && typeof parsed.payload === "object" ? parsed.payload : parsed;
    const data = payload.data && typeof payload.data === "object" ? payload.data : {};
    return {
      formName: payload.form_name || payload.formName || data["form-name"] || "pump-inquiry",
      data,
      meta: payload,
    };
  }

  return { formName: "pump-inquiry", data: {} };
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => escapeHtml(item)).join(", ");
  }
  if (value === null || value === undefined || value === "") {
    return '<span style="color:#9ca3af;">(empty)</span>';
  }
  return escapeHtml(value);
}

function buildRowsForKeys(data, keys) {
  return keys
    .filter((key) => Object.prototype.hasOwnProperty.call(data, key))
    .map(
      (key) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:35%;">
            ${escapeHtml(FIELD_LABELS[key] || key)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937;">
            ${formatValue(data[key])}
          </td>
        </tr>
      `
    )
    .join("");
}

function buildUnknownRows(data) {
  const knownKeys = new Set([
    ...FIELD_SECTIONS.flatMap((section) => section.keys),
    ...HIDDEN_KEYS,
  ]);

  return Object.entries(data)
    .filter(([key]) => !knownKeys.has(key))
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:35%;">
            ${escapeHtml(FIELD_LABELS[key] || key)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937;">
            ${formatValue(value)}
          </td>
        </tr>
      `
    )
    .join("");
}

function buildHtmlEmail(formName, data) {
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://www.portable-fire-pumps.com";
  const markLogoUrl = `${siteUrl}/email/shibaura-logo-mark.png`;
  const wordmarkLogoUrl = `${siteUrl}/email/SHIBAURA-wordmark.png`;
  const sectionBlocks = FIELD_SECTIONS.map((section) => {
    const rows = buildRowsForKeys(data, section.keys);
    if (!rows) return "";
    return `
      <div style="margin: 0 0 18px;">
        <h3 style="margin:0 0 8px;font-size:14px;line-height:20px;color:#374151;text-transform:uppercase;letter-spacing:0.04em;">
          ${escapeHtml(section.title)}
        </h3>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#ffffff;">
          ${rows}
        </table>
      </div>
    `;
  }).join("");

  const unknownRows = buildUnknownRows(data);
  const fallbackBlock = sectionBlocks || unknownRows
    ? ""
    : '<p style="margin:0;color:#6b7280;">No submitted fields found.</p>';

  return `
    <div style="background:#f3f4f6;padding:24px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:14px 20px;background:#ffffff;border-bottom:1px solid #e5e7eb;text-align:center;">
          <img src="${markLogoUrl}" alt="Shibaura" style="height:34px;width:auto;vertical-align:middle;display:inline-block;" />
          <img src="${wordmarkLogoUrl}" alt="SHIBAURA" style="height:22px;width:auto;vertical-align:middle;display:inline-block;margin-left:10px;" />
        </div>
        <div style="padding:16px 20px;background:linear-gradient(90deg,#b91c1c,#ef4444);color:#ffffff;">
          <h2 style="margin:0;font-size:20px;line-height:28px;">Portable Fire Pump Inquiry</h2>
        </div>
        <div style="padding:20px;">
          ${sectionBlocks}
          ${unknownRows ? `
            <div style="margin: 0 0 18px;">
              <h3 style="margin:0 0 8px;font-size:14px;line-height:20px;color:#374151;text-transform:uppercase;letter-spacing:0.04em;">
                Additional Fields
              </h3>
              <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#ffffff;">
                ${unknownRows}
              </table>
            </div>
          ` : ""}
          ${fallbackBlock}
        </div>
      </div>
    </div>
  `;
}

function buildTextEmail(formName, data) {
  const lines = [`New form submission: ${formName}`, ""];
  for (const section of FIELD_SECTIONS) {
    const visible = section.keys.filter((key) => Object.prototype.hasOwnProperty.call(data, key));
    if (!visible.length) continue;
    lines.push(`${section.title}:`);
    for (const key of visible) {
      const value = Array.isArray(data[key]) ? data[key].join(", ") : (data[key] || "(empty)");
      lines.push(`- ${FIELD_LABELS[key] || key}: ${value}`);
    }
    lines.push("");
  }

  if (lines.length <= 2) {
    lines.push("No submitted fields found.");
  }

  return lines.join("\n");
}

async function sendEmail({ apiKey, from, toList, subject, html, text, replyTo }) {
  const body = {
    from,
    to: toList,
    subject,
    html,
    text,
  };
  if (replyTo) {
    body.reply_to = replyTo;
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend API error (${response.status}): ${body}`);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const toList = (process.env.FORM_TO_EMAIL || "nk.matsumoto.dev@gmail.com")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!apiKey || !from) {
      return {
        statusCode: 500,
        body: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable.",
      };
    }

    const { formName, data } = normalizePayload(event);
    const subject = `New form submission: ${formName}`;
    const html = buildHtmlEmail(formName, data);
    const text = buildTextEmail(formName, data);
    const replyTo = typeof data.email === "string" && data.email.includes("@") ? data.email : undefined;

    await sendEmail({
      apiKey,
      from,
      toList,
      subject,
      html,
      text,
      replyTo,
    });

    return { statusCode: 200, body: "Email sent" };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Failed to send email: ${error.message}`,
    };
  }
};
