const ALLOWED_ORIGINS = new Set([
  'https://www.portable-fire-pumps.com', 'https://portable-fire-pumps.com',
  'https://portablefirepumps.netlify.app', 'http://localhost:4321', 'http://localhost:8888',
]);
const FIELDS = ['full_name', 'organization', 'title', 'phone', 'email', 'pumps', 'served_by', 'appointment_slot', 'interest', 'preferred_follow_up', 'permission_to_contact', 'staff_note'];
const reply = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return reply(405, { ok: false, error: 'Method not allowed.' });
  const origin = event.headers?.origin || event.headers?.Origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) return reply(403, { ok: false, error: 'Forbidden.' });
  const { TURNSTILE_SECRET_KEY, KOJEX_BOOTH_API_URL, KOJEX_BOOTH_API_SECRET } = process.env;
  if (!TURNSTILE_SECRET_KEY || !KOJEX_BOOTH_API_URL || !KOJEX_BOOTH_API_SECRET) return reply(503, { ok: false, error: 'Service unavailable.' });
  let data;
  try { data = JSON.parse(event.body || '{}'); } catch { return reply(400, { ok: false, error: 'Invalid submission.' }); }
  if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data.turnstile_token !== 'string' || !data.turnstile_token) return reply(400, { ok: false, error: 'Verification required.' });
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: data.turnstile_token, remoteip: event.headers?.['x-nf-client-connection-ip'] }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verification.ok || !(await verification.json()).success) return reply(403, { ok: false, error: 'Verification failed. Please try again.' });
    const endpoint = new URL('/api/method/kojex_erp.crm.booth_capture.capture_booth_lead', KOJEX_BOOTH_API_URL);
    if (endpoint.protocol !== 'https:') return reply(503, { ok: false, error: 'Service unavailable.' });
    const payload = Object.fromEntries(FIELDS.filter(key => data[key] !== undefined).map(key => [key, data[key]]));
    payload.show_name = 'OAFC 2026';
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Kojex-Booth-Secret': KOJEX_BOOTH_API_SECRET }, body: JSON.stringify(payload), redirect: 'error', signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    if ((response.status === 200 || response.status === 201) && result?.message?.ok === true) return reply(response.status, result.message);
    if ([403, 409, 422].includes(response.status) && result?.message?.ok === false) return reply(response.status, result.message);
    return reply(502, { ok: false, error: 'Service unavailable. Please try again.' });
  } catch {
    return reply(502, { ok: false, error: 'Service unavailable. Please try again.' });
  }
};
