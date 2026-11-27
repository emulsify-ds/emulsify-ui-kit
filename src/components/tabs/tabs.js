(() => {
  const selector = '.tabs[data-tabs-display]';
  const behaviorId = 'emulsify-tabs';
  const cleanups = new WeakMap();

  function widgetsIn(context) {
    const widgets = [...context.querySelectorAll(selector)];
    if (context.matches?.(selector)) widgets.unshift(context);
    return widgets;
  }

  function enhance(widget) {
    const list = widget.querySelector(':scope > .tabs__nav');
    if (!list) return;

    const tabs = [...list.querySelectorAll(':scope > li > [role="tab"]')];
    const panels = new Map(
      [
        ...widget.querySelectorAll(
          ':scope > .tabs__panels > [role="tabpanel"]',
        ),
      ].map((panel) => [panel.id, panel]),
    );
    const pairs = tabs.map((tab) => ({
      tab,
      panel: panels.get(tab.getAttribute('aria-controls')),
    }));
    // Keep all panels readable when a composed override cannot form a tab set.
    if (
      !tabs.length ||
      panels.size !== tabs.length ||
      pairs.some(
        ({ tab, panel }) => panel?.getAttribute('aria-labelledby') !== tab.id,
      ) ||
      new Set(pairs.map(({ panel }) => panel)).size !== tabs.length
    ) {
      return;
    }

    const controller = new AbortController();
    const options = { signal: controller.signal };
    const defaultIndex = Math.max(
      0,
      tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'),
    );

    function select(index) {
      pairs.forEach(({ tab, panel }, position) => {
        const selected = position === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panel.hidden = !selected;
      });
    }

    function selectFragment() {
      let fragment;
      try {
        fragment = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const index = pairs.findIndex(({ tab, panel }) =>
        [tab.id, panel.id].includes(fragment),
      );
      if (index !== -1) select(index);
    }

    select(defaultIndex);
    selectFragment();
    window.addEventListener('hashchange', selectFragment, options);

    list.addEventListener(
      'focusin',
      (event) => {
        const index = tabs.indexOf(event.target);
        if (index !== -1) select(index);
      },
      options,
    );

    list.addEventListener(
      'click',
      (event) => {
        const index = tabs.indexOf(event.target.closest?.('[role="tab"]'));
        if (index === -1) return;

        select(index);
        window.history.replaceState(
          window.history.state,
          '',
          '#' + pairs[index].panel.id,
        );
      },
      options,
    );

    list.addEventListener(
      'keydown',
      (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const index = tabs.indexOf(event.target);
        if (index === -1) return;

        const rtl = getComputedStyle(list).direction === 'rtl';
        const destinations = {
          ArrowLeft: (index + (rtl ? 1 : -1) + tabs.length) % tabs.length,
          ArrowRight: (index + (rtl ? -1 : 1) + tabs.length) % tabs.length,
          Home: 0,
          End: tabs.length - 1,
        };
        if (!Object.hasOwn(destinations, event.key)) return;

        event.preventDefault();
        tabs[destinations[event.key]].focus();
      },
      options,
    );

    widget.setAttribute('data-tabs-enhanced', '');
    list.hidden = false;

    cleanups.set(widget, () => {
      controller.abort();
      list.hidden = true;
      widget.removeAttribute('data-tabs-enhanced');
      select(defaultIndex);
      pairs.forEach(({ panel }) => {
        panel.hidden = false;
      });
    });
  }

  Drupal.behaviors.tabs = {
    attach(context) {
      once(behaviorId, widgetsIn(context)).forEach(enhance);
    },
    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;

      once.remove(behaviorId, widgetsIn(context)).forEach((widget) => {
        cleanups.get(widget)?.();
        cleanups.delete(widget);
      });
    },
  };
})();
