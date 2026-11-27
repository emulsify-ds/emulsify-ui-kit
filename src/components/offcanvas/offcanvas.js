Drupal.behaviors.emulsifyOffcanvas = (() => {
  const selector = '[data-offcanvas]';
  const behaviorId = 'emulsify-offcanvas';
  const cleanupByInstance = new WeakMap();
  const tabbableSelector =
    'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, summary, audio[controls], video[controls], [contenteditable], [tabindex]';

  function instancesIn(context) {
    const wrappers = [...context.querySelectorAll(selector)];
    if (context.matches?.(selector)) wrappers.unshift(context);
    return wrappers;
  }

  function wrapModalTab(event, dialog) {
    // Native modality keeps page controls inert. Wrap the edges before
    // Chrome moves focus from the dialog to its browser chrome.
    const tabbable = [...dialog.querySelectorAll(tabbableSelector)].filter(
      (element) =>
        element.tabIndex >= 0 &&
        !element.matches(':disabled') &&
        !element.closest('[hidden], [inert]') &&
        (element.checkVisibility?.({ visibilityProperty: true }) ??
          element.getClientRects().length > 0),
    );
    const first = tabbable[0];
    const last = tabbable.at(-1);
    const from = event.shiftKey ? first : last;
    const to = event.shiftKey ? last : first;
    if (to && dialog.ownerDocument.activeElement === from) {
      event.preventDefault();
      to.focus();
    }
  }

  function enhance(wrapper) {
    const trigger = wrapper.querySelector(':scope > [data-offcanvas-trigger]');
    const dialog = wrapper.querySelector(':scope > dialog');
    const close = dialog?.querySelector('[data-offcanvas-close]');
    const modal = dialog?.dataset.offcanvasType === 'modal';
    if (
      !trigger ||
      !close ||
      !dialog.close ||
      !(modal ? dialog.showModal : dialog.show)
    )
      return;

    const controller = new AbortController();
    const { signal } = controller;
    const setExpanded = (expanded) => {
      trigger.setAttribute('aria-expanded', String(expanded));
      // A closed popup is absent from the accessibility tree.
      if (expanded) trigger.setAttribute('aria-controls', dialog.id);
      else trigger.removeAttribute('aria-controls');
    };

    // The server-rendered dialog is inline until native behavior is available.
    dialog.open = false;
    setExpanded(false);
    trigger.hidden = false;
    close.hidden = false;
    wrapper.dataset.offcanvasReady = 'true';

    trigger.addEventListener(
      'click',
      () => {
        if (dialog.open) {
          dialog.close();
          return;
        }

        if (modal) {
          dialog.showModal();
          dialog.setAttribute('aria-modal', 'true');
        } else {
          dialog.show();
        }
        setExpanded(true);
        (dialog.querySelector('[autofocus]') ?? close).focus();
      },
      { signal },
    );

    close.addEventListener('click', () => dialog.close(), { signal });

    const closePaneOnEscape = (event) => {
      if (!modal && event.key === 'Escape' && dialog.open) {
        event.preventDefault();
        dialog.close();
      }
    };
    trigger.addEventListener('keydown', closePaneOnEscape, { signal });
    dialog.addEventListener(
      'keydown',
      (event) => {
        if (event.defaultPrevented || event.target.closest('dialog') !== dialog)
          return;
        closePaneOnEscape(event);
        if (modal && event.key === 'Tab' && dialog.open)
          wrapModalTab(event, dialog);
      },
      { signal },
    );

    dialog.addEventListener(
      'click',
      (event) => {
        if (!modal || event.target !== dialog || !dialog.open) return;
        const { left, right, top, bottom } = dialog.getBoundingClientRect();
        const { clientX, clientY } = event;
        if (
          clientX < left ||
          clientX > right ||
          clientY < top ||
          clientY > bottom
        )
          dialog.close();
      },
      { signal },
    );

    dialog.addEventListener(
      'close',
      () => {
        if (dialog.open) return;
        dialog.removeAttribute('aria-modal');
        setExpanded(false);
        trigger.focus();
      },
      { signal },
    );

    cleanupByInstance.set(wrapper, () => {
      controller.abort();
      if (dialog.open) dialog.close();
      dialog.open = true;
      dialog.removeAttribute('aria-modal');
      close.hidden = true;
      trigger.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', dialog.id);
      delete wrapper.dataset.offcanvasReady;
    });
  }

  return {
    attach(context) {
      once(behaviorId, instancesIn(context)).forEach(enhance);
    },

    detach(context, settings, reason) {
      if (reason !== 'unload') return;

      once.remove(behaviorId, instancesIn(context)).forEach((wrapper) => {
        cleanupByInstance.get(wrapper)?.();
        cleanupByInstance.delete(wrapper);
      });
    },
  };
})();
