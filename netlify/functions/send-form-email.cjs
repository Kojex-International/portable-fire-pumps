const RESEND_API_URL = "https://api.resend.com/emails";
const HIDDEN_KEYS = new Set(["form-name", "bot-field", "locale"]);

const FIELD_LABELS = {
  en: {
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
  },
  fr: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse courriel",
    phone: "Téléphone",
    organization: "Organisation",
    industry: "Type d’organisation",
    services: "Demande concernant",
    timeline: "Échéancier d’achat",
    volume: "Quantité estimée",
    details: "Commentaire sur la demande",
  },
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

const FIELD_SECTIONS = {
  en: [
    { title: "Contact Information", keys: ["firstName", "lastName", "email", "phone"] },
    { title: "Organization Information", keys: ["organization", "industry"] },
    { title: "Inquiry Information", keys: ["services", "timeline", "volume", "details"] },
  ],
  fr: [
    { title: "Coordonnées", keys: ["firstName", "lastName", "email", "phone"] },
    { title: "Informations sur l’organisation", keys: ["organization", "industry"] },
    { title: "Renseignements sur la demande", keys: ["services", "timeline", "volume", "details"] },
  ],
};

function getSingleValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value[value.length - 1] : undefined;
  }
  return value;
}

function getFieldLabel(fieldKey, locale) {
  return FIELD_LABELS[locale]?.[fieldKey] || FIELD_LABELS.en[fieldKey] || fieldKey;
}

function getSections(locale) {
  return FIELD_SECTIONS[locale] || FIELD_SECTIONS.en;
}

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
  const localeValue = String(getSingleValue(data.locale) || "").toLowerCase();
  return localeValue.startsWith("fr") ? "fr" : "en";
}

function buildSubmissionSubject(formName, data) {
  const locale = detectLocale(data);
  const firstName = String(getSingleValue(data.firstName) || "").trim();
  const lastName = String(getSingleValue(data.lastName) || "").trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const email = String(getSingleValue(data.email) || "").trim();

  return locale === "fr"
    ? `${fullName} (${email}) a envoyé une demande sur portable-fire-pumps.com`
    : `${fullName} (${email}) sent an inquiry from portable-fire-pumps.com`;
}

function buildRowsForKeys(data, keys, locale) {
  return keys
    .filter((key) => Object.prototype.hasOwnProperty.call(data, key))
    .map(
      (key) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:35%;font-size:15px;line-height:22px;">
            ${escapeHtml(getFieldLabel(key, locale))}
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
    ...getSections(locale).flatMap((section) => section.keys),
    ...HIDDEN_KEYS,
  ]);

  return Object.entries(data)
    .filter(([key]) => !knownKeys.has(key))
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#9ca3af;vertical-align:top;width:35%;font-size:11px;line-height:15px;">
            ${escapeHtml(getFieldLabel(key, locale))}
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
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://www.portable-fire-pumps.com";
  const markLogoUrl = `${siteUrl}/email/shibaura-logo-mark.png`;
  const wordmarkLogoUrl = `${siteUrl}/email/SHIBAURA-wordmark.png`;
  const locale = detectLocale(data);
  const sectionBlocks = getSections(locale).map((section) => {
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
        <div style="padding:14px 20px;background:#b91c1c;color:#ffffff;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="width:1%;white-space:nowrap;vertical-align:middle;">
                <table role="presentation" style="border-collapse:collapse;">
                  <tr>
                    <td style="vertical-align:middle;padding:0;">
                      <img src="${markLogoUrl}" alt="Shibaura" width="60" height="34" style="width:60px;height:34px;display:block;border:0;" />
                    </td>
                    <td style="vertical-align:middle;padding:0 0 0 10px;">
                      <img src="${wordmarkLogoUrl}" alt="SHIBAURA" width="140" height="22" style="width:140px;height:22px;display:block;border:0;" />
                    </td>
                  </tr>
                </table>
              </td>
              <td style="padding-left:14px;vertical-align:middle;">
                <h2 style="margin:0;font-size:20px;line-height:28px;color:#ffffff;">${locale === "fr" ? "Demande de pompe incendie portative" : "Portable Fire Pump Inquiry"}</h2>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding:20px;">
          ${sectionBlocks}
          ${unknownRows ? `
            <details style="margin:0 0 4px;">
              <summary style="cursor:pointer;list-style:none;font-size:11px;line-height:16px;font-weight:600;margin-bottom:6px;">
                <span style="color:#9ca3af;">Metadata</span>
              </summary>
              <table style="width:100%;border-collapse:collapse;border:1px solid #f1f5f9;border-radius:8px;overflow:hidden;background:#ffffff;">
                ${unknownRows}
              </table>
            </details>
          ` : ""}
          ${fallbackBlock}
        </div>
      </div>
    </div>
  `;
}

function buildTextEmail(formName, data) {
  const locale = detectLocale(data);
  const lines = [buildSubmissionSubject(formName, data), ""];
  for (const section of getSections(locale)) {
    const visible = section.keys.filter((key) => Object.prototype.hasOwnProperty.call(data, key));
    if (!visible.length) continue;
    lines.push(`${section.title}:`);
    for (const key of visible) {
      const value = Array.isArray(data[key])
        ? data[key].map((item) => mapDisplayValue(key, item, locale)).join(", ")
        : mapDisplayValue(key, data[key], locale) || "(empty)";
      lines.push(`- ${getFieldLabel(key, locale)}: ${value}`);
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

function getHeaderValue(headers, name) {
  if (!headers || typeof headers !== "object") return "";
  const direct = headers[name];
  if (typeof direct === "string") return direct;
  const matchedKey = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  return matchedKey && typeof headers[matchedKey] === "string" ? headers[matchedKey] : "";
}

function isEnhancedRequest(event) {
  const requestedWith = getHeaderValue(event.headers, "x-requested-with").toLowerCase();
  const accept = getHeaderValue(event.headers, "accept").toLowerCase();
  return requestedWith === "fetch" || accept.includes("application/json");
}

function getThankYouPath(locale) {
  return locale === "fr" ? "/fr/contact-us/thanks/" : "/en/contact-us/thanks/";
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

    const { formName, data, meta } = normalizePayload(event);
    const locale = detectLocale(data);
    const subject = buildSubmissionSubject(formName, data);
    const html = buildHtmlEmail(formName, data);
    const text = buildTextEmail(formName, data);
    const replyToValue = getSingleValue(data.email);
    const replyTo = typeof replyToValue === "string" && replyToValue.includes("@") ? replyToValue : undefined;

    console.log(JSON.stringify({
      message: "send-form-email received submission",
      formName,
      locale,
      payloadKeys: Object.keys(data),
      metaKeys: meta && typeof meta === "object" ? Object.keys(meta) : [],
      replyTo,
    }));

    await sendEmail({
      apiKey,
      from,
      toList,
      subject,
      html,
      text,
      replyTo,
    });

    console.log(JSON.stringify({
      message: "send-form-email send attempted",
      status: "ok",
      formName,
      locale,
    }));

    const redirectTo = getThankYouPath(locale);

    if (isEnhancedRequest(event)) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ok: true, redirectTo }),
      };
    }

    return {
      statusCode: 303,
      headers: {
        Location: redirectTo,
      },
      body: "",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(JSON.stringify({
      message: "send-form-email failed",
      error: message,
      stack: error instanceof Error ? error.stack : undefined,
    }));

    if (isEnhancedRequest(event)) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ok: false,
          error: "Failed to send inquiry. Please try again.",
          detail: message,
        }),
      };
    }

    return {
      statusCode: 500,
      body: `Failed to send email: ${message}`,
    };
  }
};
