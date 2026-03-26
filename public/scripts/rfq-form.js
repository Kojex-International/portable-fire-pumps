(() => {
  const form = document.getElementById('rfq-form');
  if (!form) return;

  const org = form.querySelector('#organization');
  const industry = form.querySelector('#industry');
  const industryStar = form.querySelector('#industry-required-star');
  const email = form.querySelector('#email');
  const phone = form.querySelector('#phone');
  const details = form.querySelector('#details');
  const submittedAt = form.querySelector('#submittedAt');
  const turnstileToken = form.querySelector('#cf-turnstile-response');
  const turnstileContainer = form.querySelector('#turnstile-widget');
  const emailError = form.querySelector('#email-conditional-error');
  const phoneError = form.querySelector('#phone-conditional-error');
  const detailsError = form.querySelector('#details-conditional-error');
  const error = form.querySelector('#industry-conditional-error');
  const submitError = form.querySelector('#rfq-submit-error');
  const submitButton = form.querySelector('button[type="submit"]');
  const localeInput = form.querySelector('input[name="locale"]');

  if (
    !(org instanceof HTMLInputElement)
    || !(industry instanceof HTMLSelectElement)
    || !(email instanceof HTMLInputElement)
    || !(phone instanceof HTMLInputElement)
    || !(details instanceof HTMLTextAreaElement)
  ) {
    return;
  }

  const invalidMsg = form.getAttribute('data-industry-invalid') || 'Please select an organization type.';
  const emailInvalidMsg = form.getAttribute('data-email-invalid') || 'Please enter a valid email address.';
  const phoneInvalidMsg = form.getAttribute('data-phone-invalid') || 'At least 10 digits.';
  const detailsInvalidMsg = form.getAttribute('data-details-invalid') || 'Please briefly describe your inquiry.';
  const submitErrorMsg = form.getAttribute('data-submit-error') || 'We could not send your inquiry. Please try again.';
  const turnstileRequiredMsg = form.getAttribute('data-turnstile-required') || 'Please complete the verification before submitting.';
  const turnstileRetryMsg = form.getAttribute('data-turnstile-retry') || 'Verification expired or failed. Please try again.';
  const turnstileSiteKey = form.getAttribute('data-turnstile-site-key') || '';

  let submitted = false;
  let turnstileWidgetId = null;
  if (submittedAt instanceof HTMLInputElement && !submittedAt.value) {
    submittedAt.value = String(Date.now());
  }

  const controls = Array.from(form.querySelectorAll('input, select, textarea')).filter((field) => {
    if (!(field instanceof HTMLElement)) return false;
    if (field instanceof HTMLInputElement) {
      return field.type !== 'hidden' && field.type !== 'checkbox';
    }
    return true;
  });

  const setVisible = (el, visible) => {
    if (!el) return;
    el.classList.toggle('hidden', !visible);
  };

  const setSubmitting = (isSubmitting) => {
    if (!(submitButton instanceof HTMLButtonElement)) return;
    submitButton.disabled = isSubmitting;
    submitButton.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');
    submitButton.style.opacity = isSubmitting ? '0.75' : '';
    submitButton.style.cursor = isSubmitting ? 'wait' : '';
  };

  const setInvalidBorder = (field, invalid) => {
    if (
      !(field instanceof HTMLInputElement)
      && !(field instanceof HTMLSelectElement)
      && !(field instanceof HTMLTextAreaElement)
    ) {
      return;
    }
    field.style.borderColor = invalid ? '#fb7185' : '';
  };

  const showError = () => {
    setInvalidBorder(industry, true);
    setVisible(error, true);
  };

  const hideError = () => {
    setInvalidBorder(industry, false);
    setVisible(error, false);
    industry.setCustomValidity('');
  };

  const hideSubmitError = () => {
    if (submitError instanceof HTMLElement) {
      submitError.textContent = submitErrorMsg;
    }
    setVisible(submitError, false);
  };

  const showSubmitError = (message) => {
    if (submitError instanceof HTMLElement) {
      submitError.textContent = message || submitErrorMsg;
    }
    setVisible(submitError, true);
  };

  const clearTurnstileToken = () => {
    if (turnstileToken instanceof HTMLInputElement) {
      turnstileToken.value = '';
    }
  };

  const getTurnstileToken = () => (
    turnstileToken instanceof HTMLInputElement ? turnstileToken.value.trim() : ''
  );

  const renderTurnstile = () => {
    if (!turnstileSiteKey) {
      showSubmitError(turnstileRequiredMsg);
      return;
    }
    if (!(turnstileContainer instanceof HTMLElement)) return;
    if (!window.turnstile || typeof window.turnstile.render !== 'function') return;
    if (turnstileWidgetId !== null) return;

    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: turnstileSiteKey,
      callback: (token) => {
        if (turnstileToken instanceof HTMLInputElement) {
          turnstileToken.value = token || '';
        }
        hideSubmitError();
      },
      'expired-callback': () => {
        clearTurnstileToken();
        showSubmitError(turnstileRetryMsg);
      },
      'error-callback': () => {
        clearTurnstileToken();
        showSubmitError(turnstileRetryMsg);
      },
    });
  };

  const ensureTurnstile = () => {
    if (window.turnstile && typeof window.turnstile.render === 'function') {
      renderTurnstile();
      return;
    }

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        window.clearInterval(intervalId);
        renderTurnstile();
        return;
      }
      if (attempts >= 50) {
        window.clearInterval(intervalId);
        showSubmitError(turnstileRetryMsg);
      }
    }, 200);
  };

  const needsIndustry = () => org.value.trim().length > 0;
  const syncRequirement = (checkError = false) => {
    const required = needsIndustry();
    industry.required = required;
    setVisible(industryStar, required);
    if (!required) {
      hideError();
      return;
    }
    if (industry.value) {
      hideError();
      return;
    }
    if (checkError && !industry.value) {
      industry.setCustomValidity(invalidMsg);
      showError();
    }
  };

  const syncEmailError = () => {
    email.setCustomValidity('');
    const shouldShow = submitted && !email.validity.valid;
    setInvalidBorder(email, shouldShow);
    setVisible(emailError, shouldShow);
    email.setCustomValidity(shouldShow ? emailInvalidMsg : '');
  };

  const syncPhoneError = () => {
    phone.setCustomValidity('');
    const shouldShow = submitted && phone.value.trim() !== '' && !phone.validity.valid;
    setInvalidBorder(phone, shouldShow);
    setVisible(phoneError, shouldShow);
    phone.setCustomValidity(shouldShow ? phoneInvalidMsg : '');
  };

  const syncDetailsError = () => {
    details.setCustomValidity('');
    const shouldShow = submitted && !details.validity.valid;
    setInvalidBorder(details, shouldShow);
    setVisible(detailsError, shouldShow);
    details.setCustomValidity(shouldShow ? detailsInvalidMsg : '');
  };

  const syncInvalidFieldBorders = () => {
    controls.forEach((field) => {
      if (
        field instanceof HTMLInputElement
        || field instanceof HTMLSelectElement
        || field instanceof HTMLTextAreaElement
      ) {
        setInvalidBorder(field, submitted && !field.validity.valid);
      }
    });
  };

  controls.forEach((field) => {
    const sync = () => {
      if (!submitted) return;
      syncInvalidFieldBorders();
    };
    field.addEventListener('input', sync);
    field.addEventListener('change', sync);
  });

  org.addEventListener('input', () => {
    syncRequirement(submitted);
    syncInvalidFieldBorders();
  });
  industry.addEventListener('change', () => {
    hideError();
    if (submitted) syncRequirement(true);
    syncInvalidFieldBorders();
  });
  email.addEventListener('input', () => {
    syncEmailError();
    syncInvalidFieldBorders();
  });
  email.addEventListener('change', () => {
    syncEmailError();
    syncInvalidFieldBorders();
  });
  phone.addEventListener('input', () => {
    syncPhoneError();
    syncInvalidFieldBorders();
  });
  phone.addEventListener('change', () => {
    syncPhoneError();
    syncInvalidFieldBorders();
  });
  details.addEventListener('input', () => {
    syncDetailsError();
    syncInvalidFieldBorders();
  });
  details.addEventListener('change', () => {
    syncDetailsError();
    syncInvalidFieldBorders();
  });

  form.addEventListener(
    'invalid',
    (event) => {
      submitted = true;
      syncRequirement(true);
      syncEmailError();
      syncPhoneError();
      syncDetailsError();
      syncInvalidFieldBorders();

      const target = event.target;
      if (target === industry && industry.required && !industry.value) {
        industry.setCustomValidity(invalidMsg);
        showError();
      }

      if (target === phone && phone.value.trim() === '') {
        phone.setCustomValidity('');
        setVisible(phoneError, false);
        setInvalidBorder(phone, false);
      }
    },
    true
  );

  form.addEventListener('submit', (event) => {
    submitted = true;
    syncEmailError();
    syncPhoneError();
    syncDetailsError();
    syncRequirement(true);
    syncInvalidFieldBorders();

    const isValid = form.checkValidity();
    if (!isValid) {
      event.preventDefault();
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    if (!getTurnstileToken()) {
      event.preventDefault();
      showSubmitError(turnstileRequiredMsg);
      return;
    }

    event.preventDefault();
    hideSubmitError();
    setSubmitting(true);

    const body = new URLSearchParams(new FormData(form)).toString();
    fetch(form.action, {
      method: form.method || 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'X-Requested-With': 'fetch',
      },
      body,
    })
      .then(async (response) => {
        let payload = null;
        try {
          payload = await response.json();
        } catch {
          payload = null;
        }

        if (!response.ok) {
          const message = payload && typeof payload.error === 'string' ? payload.error : submitErrorMsg;
          if (window.turnstile && turnstileWidgetId !== null && typeof window.turnstile.reset === 'function') {
            clearTurnstileToken();
            window.turnstile.reset(turnstileWidgetId);
          }
          throw new Error(message);
        }

        const localeValue = localeInput instanceof HTMLInputElement ? localeInput.value : '';
        const redirectTo = payload && typeof payload.redirectTo === 'string'
          ? payload.redirectTo
          : (localeValue === 'fr' ? '/fr/contact-us/thanks/' : '/en/contact-us/thanks/');
        window.location.assign(redirectTo);
      })
      .catch((err) => {
        showSubmitError(err instanceof Error && err.message ? err.message : submitErrorMsg);
        setSubmitting(false);
      });
  });

  syncRequirement();
  hideSubmitError();
  ensureTurnstile();
})();
