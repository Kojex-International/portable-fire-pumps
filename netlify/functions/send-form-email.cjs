const RESEND_API_URL = "https://api.resend.com/emails";

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

function buildRows(data) {
  const hiddenKeys = new Set(["form-name", "bot-field"]);
  return Object.entries(data)
    .filter(([key]) => !hiddenKeys.has(key))
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:35%;">
            ${escapeHtml(key)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937;">
            ${formatValue(value)}
          </td>
        </tr>
      `
    )
    .join("");
}

async function sendEmail({ apiKey, from, to, subject, html, text }) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
    }),
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
    const to = process.env.FORM_TO_EMAIL || "nk.matsumoto.dev@gmail.com";

    if (!apiKey || !from) {
      return {
        statusCode: 500,
        body: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable.",
      };
    }

    const { formName, data } = normalizePayload(event);
    const rows = buildRows(data);
    const subject = `New form submission: ${formName}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;padding:16px;color:#111827;">
        <h2 style="margin:0 0 12px;">New Form Submission</h2>
        <p style="margin:0 0 16px;color:#4b5563;">
          <strong>Form:</strong> ${escapeHtml(formName)}
        </p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${rows || '<tr><td style="padding:12px;color:#6b7280;">No submitted fields found.</td></tr>'}
        </table>
      </div>
    `;

    await sendEmail({
      apiKey,
      from,
      to,
      subject,
      html,
      text: `New submission received for ${formName}.`,
    });

    return { statusCode: 200, body: "Email sent" };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Failed to send email: ${error.message}`,
    };
  }
};
