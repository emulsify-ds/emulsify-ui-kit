// Offcanvas: native <dialog> with delegated listeners, so no per-element init or Drupal is needed.
(() => {
  // Bind once even if the script is loaded more than once.
  if (window.offcanvasInitialized) return;
  window.offcanvasInitialized = true;

  const focusable =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const openers = new WeakMap();

  // Sync aria-expanded on every trigger that controls the dialog.
  const setExpanded = (dialog, value) =>
    document
      .querySelectorAll(
        `[data-offcanvas-trigger][aria-controls="${dialog.id}"]`,
      )
      .forEach((trigger) => trigger.setAttribute('aria-expanded', value));

  // Play the exit transition, then close; resolves at once when there is no motion.
  const closeDialog = (dialog) => {
    if (dialog.hasAttribute('data-closing')) return;
    dialog.setAttribute('data-closing', '');
    Promise.all(dialog.getAnimations().map((a) => a.finished)).finally(() => {
      dialog.removeAttribute('data-closing');
      dialog.close();
    });
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-offcanvas-trigger]');
    if (trigger) {
      const dialog = document.getElementById(
        trigger.getAttribute('aria-controls'),
      );
      if (!dialog || dialog.open) return;
      openers.set(dialog, trigger);
      dialog.showModal();
      (dialog.querySelector(focusable) || dialog).focus();
      setExpanded(dialog, 'true');
      return;
    }

    // Close button, or backdrop click (the click lands on the dialog itself).
    const dialog = e.target.closest('.js-offcanvas');
    if (
      dialog &&
      (e.target === dialog || e.target.closest('[data-offcanvas-close]'))
    ) {
      closeDialog(dialog);
    }
  });

  document.addEventListener('keydown', (e) => {
    const dialog = e.target.closest?.('.js-offcanvas[open]');
    if (!dialog) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDialog(dialog);
      return;
    }
    if (e.key !== 'Tab') return;

    // Keep Tab cycling between the first and last focusable elements.
    const items = [...dialog.querySelectorAll(focusable)].filter(
      (el) => el.checkVisibility?.() ?? true,
    );
    const first = items[0];
    const last = items[items.length - 1];
    if (!first) {
      e.preventDefault();
    } else if (e.shiftKey && [first, dialog].includes(document.activeElement)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Runs for every close path (button, backdrop, Escape) since `close` does not bubble.
  document.addEventListener(
    'close',
    (e) => {
      if (!e.target.matches?.('.js-offcanvas')) return;
      setExpanded(e.target, 'false');
      openers.get(e.target)?.focus();
    },
    true,
  );
})();
