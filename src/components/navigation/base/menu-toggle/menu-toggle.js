Drupal.behaviors.menuToggle = (() => {
  const menuSelector = '[data-menu]';
  const toggleSelector = 'button[data-menu-toggle]';
  const behaviorId = 'emulsify-menu';
  const toggleId = 'emulsify-menu-toggle';
  const listeners = new WeakMap();

  function menusIn(context) {
    const menus = new Set(context.querySelectorAll(menuSelector));
    const owner = context.closest?.(menuSelector);
    if (owner) menus.add(owner);
    return menus;
  }

  function togglesFor(menu) {
    return [...menu.querySelectorAll(toggleSelector)].filter(
      (toggle) => toggle.closest(menuSelector) === menu,
    );
  }

  function panelFor(menu, toggle) {
    const panel = menu.ownerDocument.getElementById(
      toggle.getAttribute('aria-controls'),
    );
    return panel?.closest(menuSelector) === menu ? panel : null;
  }

  function setExpanded(menu, toggle, expanded) {
    const panel = panelFor(menu, toggle);
    if (!panel) return;

    toggle.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;
    if (!expanded) {
      for (const child of togglesFor(menu)) {
        if (panel.contains(child)) {
          child.setAttribute('aria-expanded', 'false');
          const childPanel = panelFor(menu, child);
          if (childPanel) childPanel.hidden = true;
        }
      }
    }
  }

  function close(menu, type) {
    return (toggle) => {
      if (toggle.dataset.menuToggle === type && !toggle.hidden) {
        setExpanded(menu, toggle, false);
      }
    };
  }

  function attachListeners(menu) {
    const controller = new AbortController();
    listeners.set(menu, controller);
    const options = { signal: controller.signal };

    menu.addEventListener(
      'click',
      (event) => {
        const toggle = event.target.closest?.(toggleSelector);
        if (!toggle || toggle.hidden || toggle.closest(menuSelector) !== menu) {
          return;
        }
        setExpanded(
          menu,
          toggle,
          toggle.getAttribute('aria-expanded') !== 'true',
        );
      },
      options,
    );

    menu.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Escape' || event.defaultPrevented) return;
        if (event.target.closest?.(menuSelector) !== menu) return;

        // Iterate in reverse document order to close the innermost panel first.
        const openToggle = togglesFor(menu)
          .reverse()
          .find((toggle) => {
            if (
              toggle.hidden ||
              toggle.getAttribute('aria-expanded') !== 'true'
            ) {
              return false;
            }
            return (
              toggle === event.target ||
              panelFor(menu, toggle)?.contains(event.target)
            );
          });
        if (!openToggle) return;

        event.preventDefault();
        event.stopPropagation();
        setExpanded(menu, openToggle, false);
        openToggle.focus();
      },
      options,
    );

    menu.addEventListener(
      'focusout',
      (event) => {
        if (!event.relatedTarget || menu.contains(event.relatedTarget)) return;
        const toggles = togglesFor(menu);
        toggles.forEach(close(menu, 'submenu'));
        toggles.forEach(close(menu, 'root'));
      },
      options,
    );
  }

  function fallbackLabelFor(toggle) {
    return toggle.parentElement.querySelector('[data-menu-fallback-label]');
  }

  return {
    attach(context) {
      menusIn(context).forEach((menu) => {
        once(behaviorId, [menu]).forEach(attachListeners);
        once(toggleId, togglesFor(menu)).forEach((toggle) => {
          if (!panelFor(menu, toggle)) return;
          if (
            toggle.dataset.menuToggle === 'root' &&
            menu.hasAttribute('data-menu-collapse-on-overflow')
          ) {
            return;
          }
          setExpanded(menu, toggle, false);
          toggle.hidden = false;
          const label = fallbackLabelFor(toggle);
          if (label) label.hidden = true;
        });
      });
    },

    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;
      const menus = [...menusIn(context)].filter((menu) =>
        context.contains(menu),
      );
      once.remove(behaviorId, menus).forEach((menu) => {
        listeners.get(menu)?.abort();
        listeners.delete(menu);
        once.remove(toggleId, togglesFor(menu)).forEach((toggle) => {
          setExpanded(menu, toggle, true);
          toggle.hidden = true;
          const label = fallbackLabelFor(toggle);
          if (label) label.hidden = false;
        });
      });
    },
  };
})();
