const RESEND_API_URL = "https://api.resend.com/emails";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const HIDDEN_KEYS = new Set(["form-name", "bot-field", "companyWebsite", "submittedAt", "locale", "cf-turnstile-response"]);
const MIN_SUBMISSION_AGE_MS = 4000;
const MAX_LINK_COUNT = 2;
const DUPLICATE_TTL_MS = 10 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_SHORT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_EMAIL_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 10;
const RATE_LIMIT_MAX_PER_IP_SHORT = 3;
const RATE_LIMIT_MAX_PER_EMAIL = 5;
const recentSubmissionFingerprints = new Map();
const requestRateBuckets = new Map();

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

function getTurnstileErrorMessage(locale) {
  return locale === "fr"
    ? "La vérification a expiré ou a échoué. Veuillez réessayer."
    : "Verification expired or failed. Please try again.";
}

function getStringValue(value) {
  const single = getSingleValue(value);
  return typeof single === "string" ? single.trim() : "";
}

function logSpamDecision({ reason, locale, data, extra }) {
  console.log(JSON.stringify({
    message: "send-form-email suppressed submission",
    reason,
    locale,
    payloadKeys: Object.keys(data),
    detailsLength: getStringValue(data.details).length,
    extra,
  }));
}

function buildSuccessResponse(event, locale) {
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
}

function buildTurnstileFailureResponse(event, locale, reason) {
  const errorMessage = getTurnstileErrorMessage(locale);

  console.log(JSON.stringify({
    message: "send-form-email rejected turnstile verification",
    reason,
    locale,
  }));

  if (isEnhancedRequest(event)) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ok: false,
        error: errorMessage,
        reason,
      }),
    };
  }

  return {
    statusCode: 400,
    body: errorMessage,
  };
}

function buildRateLimitFailureResponse(event, locale, reason) {
  const errorMessage = locale === "fr"
    ? "Trop de tentatives en peu de temps. Veuillez réessayer dans quelques minutes."
    : "Too many requests in a short period. Please try again in a few minutes.";

  console.log(JSON.stringify({
    message: "send-form-email rate limit exceeded",
    reason,
    locale,
  }));

  if (isEnhancedRequest(event)) {
    return {
      statusCode: 429,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ok: false,
        error: errorMessage,
        reason,
      }),
    };
  }

  return {
    statusCode: 429,
    body: errorMessage,
  };
}

function countLinks(value) {
  return (value.match(/https?:\/\/|www\./gi) || []).length;
}

function hasSuspiciousContent(value) {
  return /\b(?:viagra|cialis|casino|betting|loan|debt relief|crypto(?:currency)?|forex|seo service|backlinks?)\b/i.test(value);
}

function hasRequiredFields(data) {
  return [
    getStringValue(data.firstName).length >= 2,
    getStringValue(data.lastName).length >= 2,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getStringValue(data.email)),
    getStringValue(data.details).length >= 12,
  ].every(Boolean);
}

function classifySpamRisk(data) {
  const details = getStringValue(data.details);
  const organization = getStringValue(data.organization);
  const fullName = `${getStringValue(data.firstName)} ${getStringValue(data.lastName)}`.trim();
  const searchableText = [fullName, organization, details].filter(Boolean).join(" ");
  const linkCount = [fullName, organization, details]
    .reduce((total, field) => total + countLinks(field), 0);

  if (linkCount > MAX_LINK_COUNT) {
    return { reason: "too_many_links", extra: { linkCount } };
  }

  if (details && details.replace(/[\W_]+/g, "").length < 10) {
    return { reason: "low_signal_message", extra: { strippedLength: details.replace(/[\W_]+/g, "").length } };
  }

  if (searchableText && hasSuspiciousContent(searchableText)) {
    return { reason: "suspicious_content", extra: { linkCount } };
  }

  return null;
}

function cleanupRecentFingerprints(now) {
  for (const [key, expiresAt] of recentSubmissionFingerprints.entries()) {
    if (expiresAt <= now) {
      recentSubmissionFingerprints.delete(key);
    }
  }
}

function cleanupRateBuckets(now) {
  for (const [key, bucket] of requestRateBuckets.entries()) {
    if (!bucket || bucket.expiresAt <= now) {
      requestRateBuckets.delete(key);
    }
  }
}

function consumeRateBucket({ key, windowMs, maxCount, now }) {
  const existing = requestRateBuckets.get(key);
  if (!existing || existing.expiresAt <= now) {
    requestRateBuckets.set(key, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return { limited: false, count: 1 };
  }

  existing.count += 1;
  requestRateBuckets.set(key, existing);
  return {
    limited: existing.count > maxCount,
    count: existing.count,
  };
}

function getSubmissionFingerprint(data, locale) {
  return JSON.stringify({
    locale,
    email: getStringValue(data.email).toLowerCase(),
    details: getStringValue(data.details).toLowerCase().replace(/\s+/g, " "),
  });
}

function getClientIp(event) {
  const forwardedFor = getHeaderValue(event.headers, "x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const netlifyIp = getHeaderValue(event.headers, "x-nf-client-connection-ip");
  return netlifyIp.trim();
}

async function verifyTurnstileToken({ secretKey, token, ip }) {
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verify error (${response.status})`);
  }

  return response.json();
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
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
    const toList = (process.env.FORM_TO_EMAIL || "nk.matsumoto.dev@gmail.com")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!apiKey || !from || !turnstileSecretKey) {
      return {
        statusCode: 500,
        body: "Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or TURNSTILE_SECRET_KEY environment variable.",
      };
    }

    const { formName, data, meta } = normalizePayload(event);
    const locale = detectLocale(data);
    const clientIp = getClientIp(event);

    if (formName !== "pump-inquiry") {
      return {
        statusCode: 400,
        body: "Invalid form submission.",
      };
    }

    if (!hasRequiredFields(data)) {
      console.log(JSON.stringify({
        message: "send-form-email rejected invalid submission",
        reason: "missing_required_fields",
        locale,
        payloadKeys: Object.keys(data),
      }));
      return {
        statusCode: 400,
        body: "Invalid form submission.",
      };
    }

    const now = Date.now();
    cleanupRateBuckets(now);

    if (clientIp) {
      const ipWindow = consumeRateBucket({
        key: `ip:${clientIp}:long`,
        windowMs: RATE_LIMIT_WINDOW_MS,
        maxCount: RATE_LIMIT_MAX_PER_IP,
        now,
      });
      if (ipWindow.limited) {
        return buildRateLimitFailureResponse(event, locale, "rate_limit_ip");
      }

      const ipShortWindow = consumeRateBucket({
        key: `ip:${clientIp}:short`,
        windowMs: RATE_LIMIT_SHORT_WINDOW_MS,
        maxCount: RATE_LIMIT_MAX_PER_IP_SHORT,
        now,
      });
      if (ipShortWindow.limited) {
        return buildRateLimitFailureResponse(event, locale, "rate_limit_ip_burst");
      }
    }

    const emailKey = getStringValue(data.email).toLowerCase();
    if (emailKey) {
      const emailWindow = consumeRateBucket({
        key: `email:${emailKey}`,
        windowMs: RATE_LIMIT_EMAIL_WINDOW_MS,
        maxCount: RATE_LIMIT_MAX_PER_EMAIL,
        now,
      });
      if (emailWindow.limited) {
        return buildRateLimitFailureResponse(event, locale, "rate_limit_email");
      }
    }

    const turnstileToken = getStringValue(data["cf-turnstile-response"]);
    if (!turnstileToken) {
      return buildTurnstileFailureResponse(event, locale, "turnstile_missing");
    }

    let turnstileResult;
    try {
      turnstileResult = await verifyTurnstileToken({
        secretKey: turnstileSecretKey,
        token: turnstileToken,
        ip: clientIp,
      });
    } catch (error) {
      console.error(JSON.stringify({
        message: "send-form-email turnstile verification error",
        locale,
        error: error instanceof Error ? error.message : String(error),
      }));
      return buildTurnstileFailureResponse(event, locale, "turnstile_error");
    }

    if (!turnstileResult || turnstileResult.success !== true) {
      return buildTurnstileFailureResponse(event, locale, "turnstile_failed");
    }

    const honeypotValue = getStringValue(data.companyWebsite) || getStringValue(data["bot-field"]);
    if (honeypotValue) {
      logSpamDecision({ reason: "honeypot", locale, data });
      return buildSuccessResponse(event, locale);
    }

    const submittedAtRaw = getStringValue(data.submittedAt);
    const submittedAt = Number.parseInt(submittedAtRaw, 10);
    if (!Number.isFinite(submittedAt)) {
      logSpamDecision({ reason: "missing_timestamp", locale, data });
      return buildSuccessResponse(event, locale);
    }

    const elapsedMs = Date.now() - submittedAt;
    if (elapsedMs < MIN_SUBMISSION_AGE_MS) {
      logSpamDecision({ reason: "submitted_too_fast", locale, data, extra: { elapsedMs } });
      return buildSuccessResponse(event, locale);
    }

    const spamRisk = classifySpamRisk(data);
    if (spamRisk) {
      logSpamDecision({ reason: spamRisk.reason, locale, data, extra: spamRisk.extra });
      return buildSuccessResponse(event, locale);
    }

    cleanupRecentFingerprints(now);
    const fingerprint = getSubmissionFingerprint(data, locale);
    if (recentSubmissionFingerprints.has(fingerprint)) {
      logSpamDecision({ reason: "duplicate_submission", locale, data });
      return buildSuccessResponse(event, locale);
    }
    recentSubmissionFingerprints.set(fingerprint, now + DUPLICATE_TTL_MS);

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

    return buildSuccessResponse(event, locale);
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
