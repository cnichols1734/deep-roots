(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
    });

    mobileNav.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  }

  const btn = document.querySelector('[data-fake-submit]');
  const note = document.querySelector('[data-form-note]');
  if (btn) {
    btn.addEventListener('click', () => {
      const form = btn.closest('form');
      if (!form) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const details = String(data.get('details') || '').trim();

      if (!name || !details) {
        if (note) note.textContent = 'Please add your name and what you need.';
        return;
      }

      const subject = encodeURIComponent('Quote request — Deep Roots Nursery');
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          '',
          'Request:',
          details,
          '',
          '— Sent from Deep Roots Nursery website form (client-side).'
        ].join('\n')
      );

      window.location.href = `mailto:info@deeprootsnursery.example?subject=${subject}&body=${body}`;

      if (note) note.textContent = 'Opening your email app with the request…';
    });
  }
})();
