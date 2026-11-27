Drupal.behaviors.emulsifyHeader = (() => {
  const selector = '[data-header]';
  const behaviorId = 'emulsify-header';
  const cleanups = new WeakMap();

  function instancesIn(context) {
    const headers = [...context.querySelectorAll(selector)];
    if (context.matches?.(selector)) headers.unshift(context);
    return headers;
  }

  function enhance(header) {
    const bar = header.querySelector('[data-header-bar]');
    const home = bar?.querySelector('[data-header-nav-home]');
    const menu = home?.querySelector('[data-header-menu]');
    const drawer = bar?.querySelector('[data-header-drawer]');
    const target = drawer?.querySelector('[data-header-nav-drawer]');
    const dialog = drawer?.querySelector('dialog');
    const trigger = drawer?.querySelector('[data-offcanvas-trigger]');
    if (!menu || !target || !dialog || !trigger || !window.ResizeObserver)
      return;

    const primary = menu.querySelector('[data-menu-collapse-on-overflow]');
    const panel = primary?.querySelector(':scope > [data-menu-root-panel]');
    const toggle = primary?.querySelector(':scope > [data-menu-toggle="root"]');
    const focusable = 'a[href], button:not([disabled]), [tabindex="0"]';

    function moveToDrawer() {
      if (primary && panel && toggle) {
        // The dialog supplies its own Menu button. Keep child disclosures.
        Drupal.behaviors.mainNav?.detach(primary, {}, 'unload');
        delete primary.dataset.menuCollapseOnOverflow;
        delete primary.dataset.menuMode;
        panel.hidden = false;
        toggle.hidden = true;
        toggle.setAttribute('aria-expanded', 'true');
      }

      target.append(menu);
      home.hidden = true;
      drawer.hidden = false;
    }

    function moveHome(reactivate = true) {
      if (dialog.open) dialog.close();
      home.append(menu);
      home.hidden = false;
      drawer.hidden = true;
      if (primary) {
        primary.dataset.menuCollapseOnOverflow = 'true';
        if (reactivate) Drupal.behaviors.mainNav?.attach(primary);
      }
    }

    function update() {
      const compact =
        getComputedStyle(bar).getPropertyValue('--header-menu-mode').trim() ===
        'compact';
      const inDrawer = menu.parentElement === target;
      const ready = drawer.dataset.offcanvasReady === 'true';
      if ((compact && ready) === inDrawer) return;

      const focused = header.ownerDocument.activeElement;
      if (compact && ready) {
        moveToDrawer();
        if (menu.contains(focused)) trigger.focus();
      } else {
        const returnFocus = drawer.contains(focused);
        moveHome();
        if (returnFocus) {
          const replacement =
            menu.contains(focused) && !focused.closest('[hidden]')
              ? focused
              : [...menu.querySelectorAll(focusable)].find(
                  (element) => !element.closest('[hidden]'),
                );
          replacement?.focus();
        }
      }
    }

    const resize = new ResizeObserver(update);
    resize.observe(header);
    const readiness = new MutationObserver(update);
    readiness.observe(drawer, { attributeFilter: ['data-offcanvas-ready'] });
    update();

    cleanups.set(header, () => {
      resize.disconnect();
      readiness.disconnect();
      if (menu.parentElement === target) moveHome(false);
    });
  }

  return {
    attach(context) {
      once(behaviorId, instancesIn(context)).forEach(enhance);
    },
    detach(context, settings, reason) {
      if (reason !== 'unload') return;
      once.remove(behaviorId, instancesIn(context)).forEach((header) => {
        cleanups.get(header)?.();
        cleanups.delete(header);
      });
    },
  };
})();
