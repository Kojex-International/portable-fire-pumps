(() => {
  const form = document.querySelector('#booth-lead-form');
  if (!form) return;
  const status = document.querySelector('#booth-status');
  const rows = document.querySelector('#pump-rows');
  const button = form.querySelector('[type="submit"]');
  let token = '';
  let widget = null;
  document.querySelector('#add-pump').addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'grid gap-3 rounded-lg border border-slate-200 p-3 sm:grid-cols-3';
    row.innerHTML = '<label>Make / model<input name="make_model" maxlength="140" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"></label><label>Quantity<input name="quantity" type="number" min="1" max="10000" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"></label><label>Approximate age<input name="approximate_age" maxlength="80" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"></label><button type="button" class="text-left text-sm underline">Remove pump</button>';
    row.querySelector('button').addEventListener('click', () => row.remove());
    rows.append(row);
  });
  let attempts = 0;
  const render = () => {
    if (!form.dataset.siteKey) { status.textContent = 'Verification is unavailable. Please contact us instead.'; return; }
    if (!window.turnstile) { if (++attempts < 40) setTimeout(render, 250); else status.textContent = 'Verification is unavailable. Please contact us instead.'; return; }
    widget = window.turnstile.render('#booth-turnstile', { sitekey: form.dataset.siteKey, callback: value => { token = value; }, 'expired-callback': () => { token = ''; }, 'error-callback': () => { token = ''; status.textContent = 'Verification failed. Please try again.'; } });
  };
  render();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!token) { status.textContent = 'Please complete verification before sending.'; return; }
    button.disabled = true;
    status.textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form));
    data.permission_to_contact = true;
    data.show_name = 'OAFC 2026';
    data.pumps = Array.from(rows.children, row => ({ make_model: row.querySelector('[name="make_model"]').value.trim(), quantity: row.querySelector('[name="quantity"]').value ? Number(row.querySelector('[name="quantity"]').value) : null, approximate_age: row.querySelector('[name="approximate_age"]').value.trim() })).filter(pump => pump.make_model || pump.quantity || pump.approximate_age);
    delete data.make_model; delete data.quantity; delete data.approximate_age;
    data.turnstile_token = token;
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('We could not send your inquiry. Please try again or contact us.');
      form.hidden = true;
      const confirmation = document.createElement('p');
      confirmation.className = 'mt-6 font-semibold text-green-700';
      confirmation.textContent = 'Thank you. Your inquiry has been sent.';
      form.before(confirmation);
      const booking = document.querySelector('#booth-booking');
      if (booking) booking.hidden = false;
    } catch (error) {
      status.textContent = error.message || 'We could not send your inquiry. Please try again.';
      token = '';
      if (widget !== null) window.turnstile.reset(widget);
      button.disabled = false;
    }
  });
})();
