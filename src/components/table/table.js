Drupal.behaviors.emulsifyTable = (() => {
  const selector = '[data-table-scroll-label]';
  const behaviorId = 'emulsify-table';
  const observers = new WeakMap();

  function regionsIn(context) {
    const regions = [...context.querySelectorAll(selector)];
    if (context.matches?.(selector)) regions.unshift(context);
    return regions;
  }

  function updateRegion(region) {
    if (region.scrollWidth > region.clientWidth) {
      region.setAttribute('tabindex', '0');
      region.setAttribute('role', 'region');
      region.setAttribute('aria-label', region.dataset.tableScrollLabel);
    } else {
      region.removeAttribute('tabindex');
      region.removeAttribute('role');
      region.removeAttribute('aria-label');
    }
  }

  return {
    attach(context) {
      once(behaviorId, regionsIn(context)).forEach((region) => {
        const observer = new ResizeObserver(() => updateRegion(region));
        observers.set(region, observer);
        observer.observe(region);
        observer.observe(region.querySelector('table'));
        updateRegion(region);
      });
    },

    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;

      once.remove(behaviorId, regionsIn(context)).forEach((region) => {
        observers.get(region)?.disconnect();
        observers.delete(region);
      });
    },
  };
})();
