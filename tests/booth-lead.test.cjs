const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../netlify/functions/booth-lead.cjs');
const originalFetch = global.fetch;
Object.assign(process.env, { TURNSTILE_SECRET_KEY: 'test-turnstile', KOJEX_BOOTH_API_URL: 'https://erp.example.test', KOJEX_BOOTH_API_SECRET: 'test-shared' });
after(() => { global.fetch = originalFetch; });
const event = body => ({ httpMethod: 'POST', headers: { origin: 'http://localhost:4321' }, body: JSON.stringify(body) });

test('verifies Turnstile before forwarding an allowlisted lead and server secret', async () => {
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    return calls.length === 1 ? { ok: true, json: async () => ({ success: true }) } : { status: 201, json: async () => ({ message: { ok: true, action: 'created', lead: 'CRM-LEAD-test' } }) };
  };
  const result = await handler(event({ turnstile_token: 'token', full_name: 'Test', show_name: 'injected', unexpected: 'discard' }));
  assert.equal(result.statusCode, 201);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://erp.example.test/api/method/kojex_erp.crm.booth_capture.capture_booth_lead');
  assert.equal(calls[1].options.headers['X-Kojex-Booth-Secret'], 'test-shared');
  assert.deepEqual(JSON.parse(calls[1].options.body), { full_name: 'Test', show_name: 'OAFC 2026' });
  assert.equal(JSON.parse(result.body).ok, true);
});

test('does not forward failed verification', async () => {
  let calls = 0;
  global.fetch = async () => { calls++; return { ok: true, json: async () => ({ success: false }) }; };
  assert.equal((await handler(event({ turnstile_token: 'bad' }))).statusCode, 403);
  assert.equal(calls, 1);
});

test('normalizes expected backend validation errors', async () => {
  let calls = 0;
  global.fetch = async () => ++calls === 1 ? { ok: true, json: async () => ({ success: true }) } : { status: 422, json: async () => ({ message: { ok: false, error: { code: 'invalid', message: 'Invalid field' } } }) };
  const result = await handler(event({ turnstile_token: 'token' }));
  assert.equal(result.statusCode, 422);
  assert.equal(JSON.parse(result.body).error.code, 'invalid');
});
