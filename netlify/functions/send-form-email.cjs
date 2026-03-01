const RESEND_API_URL = "https://api.resend.com/emails";
const HIDDEN_KEYS = new Set(["form-name", "bot-field", "locale", "ip", "user_agent", "referrer"]);

const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  organization: "Organization",
  industry: "Organization Type",
  services: "Inquiring About",
  timeline: "Purchase Timeline",
  volume: "Estimated Quantity",
  details: "Inquiry Comment",
};

const FIELD_VALUE_LABELS = {
  industry: {
    en: {
      municipal: "Municipal Fire Services",
      government: "Government Agencies",
      wildland: "Wildland Firefighting",
      industrial: "Industrial & Plant Safety",
      utilities: "Utilities & Infrastructure",
      forestry: "Forestry & Remote Operations",
      contractor: "Firefighting Contractors",
      emergency: "Emergency Management",
      dealer: "Dealer / Reseller",
      other: "Other",
    },
    fr: {
      municipal: "Services incendie municipaux",
      government: "Organismes gouvernementaux",
      wildland: "Lutte contre les feux de végétation",
      industrial: "Sécurité industrielle et usine",
      utilities: "Services publics et infrastructures",
      forestry: "Foresterie et opérations éloignées",
      contractor: "Entrepreneurs en lutte incendie",
      emergency: "Gestion des urgences",
      dealer: "Distributeur / revendeur",
      other: "Autre",
    },
  },
  services: {
    en: {
      "pump-selection": "Pump recommendation",
      accessories: "Accessories & fittings",
      deployment: "Deployment advice",
      "service-parts": "Parts & service support",
      training: "Operator training",
      "request-quote": "Request a quote",
    },
    fr: {
      "pump-selection": "Recommandation de pompe",
      accessories: "Accessoires et raccords",
      deployment: "Conseils de déploiement",
      "service-parts": "Support pièces et service",
      training: "Formation opérateur",
      "request-quote": "Demander un devis",
    },
  },
  timeline: {
    en: {
      "1-4-months": "1-4 months",
      "3-6-months": "3-6 months",
      "6-plus-months": "6+ months",
      planning: "Planning / Budgeting",
      other: "Other",
    },
    fr: {
      "1-4-months": "1-4 months",
      "3-6-months": "3-6 months",
      "6-plus-months": "6+ months",
      planning: "Planification / budget",
      other: "Autre",
    },
  },
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

function mapDisplayValue(fieldKey, rawValue, locale) {
  const labelsByField = FIELD_VALUE_LABELS[fieldKey];
  if (!labelsByField) return rawValue;
  const labels = labelsByField[locale] || labelsByField.en || {};
  return labels[rawValue] || rawValue;
}

function formatValue(fieldKey, value, locale) {
  if (Array.isArray(value)) {
    return value
      .map((item) => escapeHtml(mapDisplayValue(fieldKey, item, locale)))
      .join(", ");
  }
  if (value === null || value === undefined || value === "") {
    return '<span style="color:#9ca3af;">(empty)</span>';
  }
  return escapeHtml(mapDisplayValue(fieldKey, value, locale));
}

function detectLocale(data) {
  return data.locale === "fr" ? "fr" : "en";
}

function buildRowsForKeys(data, keys, locale) {
  return keys
    .filter((key) => Object.prototype.hasOwnProperty.call(data, key))
    .map(
      (key) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:35%;font-size:15px;line-height:22px;">
            ${escapeHtml(FIELD_LABELS[key] || key)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:400;font-size:15px;line-height:22px;">
            ${formatValue(key, data[key], locale)}
          </td>
        </tr>
      `
    )
    .join("");
}

function buildUnknownRows(data, locale) {
  const knownKeys = new Set([
    ...FIELD_SECTIONS.flatMap((section) => section.keys),
    ...HIDDEN_KEYS,
  ]);

  return Object.entries(data)
    .filter(([key]) => !knownKeys.has(key))
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#9ca3af;vertical-align:top;width:35%;font-size:11px;line-height:15px;">
            ${escapeHtml(FIELD_LABELS[key] || key)}
          </td>
          <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;color:#9ca3af;font-size:11px;line-height:15px;font-weight:400;">
            ${formatValue(key, value, locale)}
          </td>
        </tr>
      `
    )
    .join("");
}

function buildHtmlEmail(formName, data) {
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://portable-fire-pumps.netlify.app";
  const markLogoUrl = `${siteUrl}/email/shibaura-logo-mark.png`;
  const wordmarkLogoUrl = `${siteUrl}/email/SHIBAURA-wordmark.png`;
  const locale = detectLocale(data);
  const sectionBlocks = FIELD_SECTIONS.map((section) => {
    const rows = buildRowsForKeys(data, section.keys, locale);
    if (!rows) return "";
    return `
      <div style="margin: 0 0 18px;">
        <h3 style="margin:0 0 8px;font-size:18px;line-height:26px;color:#374151;font-weight:700;">
          ${escapeHtml(section.title)}
        </h3>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#ffffff;">
          ${rows}
        </table>
      </div>
    `;
  }).join("");

  const unknownRows = buildUnknownRows(data, locale);
  const fallbackBlock = sectionBlocks || unknownRows
    ? ""
    : '<p style="margin:0;color:#6b7280;">No submitted fields found.</p>';

  return `
    <div style="background:#ffffff;padding:12px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:1000px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="padding:14px 20px;background:linear-gradient(90deg,#b91c1c,#ef4444);color:#ffffff;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="width:1%;white-space:nowrap;vertical-align:middle;">
                <img src="${markLogoUrl}" alt="Shibaura" style="height:34px;width:auto;vertical-align:middle;display:inline-block;" />
                <img src="${wordmarkLogoUrl}" alt="SHIBAURA" style="height:22px;width:auto;vertical-align:middle;display:inline-block;margin-left:10px;" />
              </td>
              <td style="padding-left:14px;vertical-align:middle;">
                <h2 style="margin:0;font-size:20px;line-height:28px;color:#ffffff;">Portable Fire Pump Inquiry</h2>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding:20px;">
          ${sectionBlocks}
          ${unknownRows ? `
            <div style="margin:0 0 4px;">
              <div style="color:#9ca3af;font-size:11px;line-height:16px;font-weight:600;margin-bottom:6px;">
                Additional Fields
              </div>
              <table style="width:100%;border-collapse:collapse;border:1px solid #f1f5f9;border-radius:8px;overflow:hidden;background:#ffffff;">
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
  const locale = detectLocale(data);
  const lines = [`New form submission: ${formName}`, ""];
  for (const section of FIELD_SECTIONS) {
    const visible = section.keys.filter((key) => Object.prototype.hasOwnProperty.call(data, key));
    if (!visible.length) continue;
    lines.push(`${section.title}:`);
    for (const key of visible) {
      const value = Array.isArray(data[key])
        ? data[key].map((item) => mapDisplayValue(key, item, locale)).join(", ")
        : mapDisplayValue(key, data[key], locale) || "(empty)";
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
