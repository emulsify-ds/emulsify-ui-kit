Drupal.behaviors.accordion = (() => {
  const rootSelector = '[data-accordion]';
  const itemSelector = '[data-accordion-item]';
  const toggleSelector = 'button[data-accordion-toggle]';
  const bulkSelector = 'button[data-accordion-bulk]';

  const within = (context, selector) => [
    ...(context.matches?.(selector) ? [context] : []),
    ...context.querySelectorAll(selector),
  ];

  const owned = (root, selector) =>
    [...root.querySelectorAll(selector)].filter(
      (element) => element.closest(rootSelector) === root,
    );

  function panelFor(toggle) {
    const item = toggle.closest(itemSelector);
    const panel = toggle.ownerDocument.getElementById(
      toggle.getAttribute('aria-controls'),
    );
    if (item && panel?.closest(itemSelector) === item) {
      return panel;
    }
    return null;
  }

  function setExpanded(toggle, expanded) {
    const panel = panelFor(toggle);
    if (panel) {
      panel.hidden = !expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
    }
  }

  function updateControls(root) {
    const toggles = owned(root, toggleSelector).filter(
      (toggle) => !toggle.hidden,
    );
    const controls = owned(root, '[data-accordion-controls]')[0];
    if (controls) controls.hidden = !toggles.length;
    owned(root, bulkSelector).forEach((button) => {
      const expanded = button.dataset.accordionBulk === 'expand';
      button.setAttribute(
        'aria-disabled',
        String(
          toggles.every(
            (toggle) =>
              (toggle.getAttribute('aria-expanded') === 'true') === expanded,
          ),
        ),
      );
    });
  }

  function handleClick(event) {
    const root = event.currentTarget;
    const button = event.target.closest?.(`${toggleSelector}, ${bulkSelector}`);
    if (!button || button.closest(rootSelector) !== root || button.hidden)
      return;
    if (button.getAttribute('aria-disabled') === 'true') return;

    if (button.matches(toggleSelector)) {
      setExpanded(button, button.getAttribute('aria-expanded') !== 'true');
    } else {
      const expanded = button.dataset.accordionBulk === 'expand';
      owned(root, toggleSelector)
        .filter((toggle) => !toggle.hidden)
        .forEach((toggle) => setExpanded(toggle, expanded));
    }
    updateControls(root);
  }

  function openFragment(doc) {
    const hash = doc.defaultView.location.hash.slice(1);
    let id = hash;
    try {
      id = decodeURIComponent(hash);
    } catch {
      // An invalid escape should not interrupt behavior attachment.
    }
    const target = id ? doc.getElementById(id) : null;
    let item = target?.closest(itemSelector);
    let opened = false;
    while (item) {
      const toggle = item.querySelector(toggleSelector);
      if (toggle?.closest(itemSelector) === item && !toggle.hidden) {
        opened ||= toggle.getAttribute('aria-expanded') !== 'true';
        setExpanded(toggle, true);
        updateControls(toggle.closest(rootSelector));
      }
      item = item.parentElement?.closest(itemSelector);
    }
    if (opened) target.scrollIntoView?.();
  }

  return {
    attach(context) {
      const doc = context.ownerDocument ?? context;
      const roots = new Set(within(context, rootSelector));
      const parent = context.closest?.(rootSelector);
      if (parent) roots.add(parent);
      if (!roots.size) return;

      once('accordion-fragment', [doc.documentElement]).forEach(() => {
        doc.defaultView.addEventListener('hashchange', () => openFragment(doc));
      });
      let enhanced = false;
      roots.forEach((root) => {
        once('accordion', [root]).forEach((accordion) => {
          accordion.addEventListener('click', handleClick);
        });
        const toggles = owned(root, toggleSelector).filter(panelFor);
        once('accordion-toggle', toggles).forEach((toggle) => {
          enhanced = true;
          toggle.hidden = false;
          toggle.parentElement.hidden = false;
          const fallback = toggle.parentElement.previousElementSibling;
          if (fallback?.matches('[data-accordion-static-heading]'))
            fallback.hidden = true;
          setExpanded(toggle, false);
        });
        updateControls(root);
      });
      if (enhanced) openFragment(doc);
    },
  };
})();
