Drupal.behaviors.headerSearch = (() => {
  const selector = '[data-search]';
  const behaviorId = 'emulsify-search';
  const cleanups = new WeakMap();

  const searchesIn = (context) => [
    ...(context.matches?.(selector) ? [context] : []),
    ...context.querySelectorAll(selector),
  ];

  function enhance(search) {
    const toggle = search.querySelector(':scope > [data-search-toggle]');
    const panel = search.querySelector(':scope > [data-search-panel]');
    if (
      !toggle ||
      !panel ||
      toggle.getAttribute('aria-controls') !== panel.id
    ) {
      return;
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    }

    const controller = new AbortController();
    const { signal } = controller;
    setOpen(false);
    toggle.hidden = false;

    toggle.addEventListener(
      'click',
      () => {
        const open = panel.hidden;
        setOpen(open);
        if (open) {
          panel
            .querySelector('input[type="search"], input[type="text"]')
            ?.focus();
        }
      },
      { signal },
    );

    search.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Escape' || panel.hidden) return;
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        toggle.focus();
      },
      { signal },
    );

    cleanups.set(search, () => {
      controller.abort();
      toggle.hidden = true;
      setOpen(true);
    });
  }

  return {
    attach(context) {
      once(behaviorId, searchesIn(context)).forEach(enhance);
    },

    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;

      once.remove(behaviorId, searchesIn(context)).forEach((search) => {
        cleanups.get(search)?.();
        cleanups.delete(search);
      });
    },
  };
})();
