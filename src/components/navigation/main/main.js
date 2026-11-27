Drupal.behaviors.mainNav = (() => {
  const selector = '[data-menu-collapse-on-overflow]';
  const behaviorId = 'emulsify-main-navigation';
  const cleanups = new WeakMap();

  function menusIn(context) {
    const menus = new Set(context.querySelectorAll(selector));
    const owner = context.closest?.(selector);
    if (owner) menus.add(owner);
    return menus;
  }

  function updateMode(menu) {
    const panel = menu.querySelector(':scope > [data-menu-root-panel]');
    const toggle = menu.querySelector(':scope > [data-menu-toggle="root"]');
    const list = panel?.querySelector(':scope > .base-menu__list');
    const available = menu.clientWidth;
    if (!list || !toggle || !available) return;

    // Measure the actual links in their inline layout, even under a closed toggle.
    menu.dataset.menuMeasuring = 'true';
    const needed = list.getBoundingClientRect().width;
    delete menu.dataset.menuMeasuring;

    const mode = needed > available ? 'compact' : 'inline';
    if (menu.dataset.menuMode === mode) return;

    const active = menu.ownerDocument.activeElement;
    menu.dataset.menuMode = mode;
    toggle.hidden = mode === 'inline';
    toggle.setAttribute('aria-expanded', String(mode === 'inline'));
    panel.hidden = mode === 'compact';

    if (mode === 'compact' && panel.contains(active)) {
      toggle.focus();
    } else if (mode === 'inline' && active === toggle) {
      list.querySelector('a[href], button:not([hidden])')?.focus();
    }
  }

  return {
    attach(context) {
      const menus = [...menusIn(context)];
      once(behaviorId, menus).forEach((menu) => {
        const observer = new ResizeObserver(() => updateMode(menu));
        const fonts = menu.ownerDocument.fonts;
        const onFontsLoaded = () => updateMode(menu);
        observer.observe(menu);
        fonts?.addEventListener?.('loadingdone', onFontsLoaded);
        cleanups.set(menu, () => {
          observer.disconnect();
          fonts?.removeEventListener?.('loadingdone', onFontsLoaded);
        });
      });
      menus.forEach(updateMode);
    },
    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;
      const menus = [...menusIn(context)].filter((menu) =>
        context.contains(menu),
      );
      once.remove(behaviorId, menus).forEach((menu) => {
        cleanups.get(menu)?.();
        cleanups.delete(menu);
        delete menu.dataset.menuMode;
      });
    },
  };
})();
