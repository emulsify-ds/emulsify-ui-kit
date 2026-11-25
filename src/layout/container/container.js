const selector = '.container';
const onceId = 'container-viewport-state';
let observer;

function containersIn(context) {
  const descendants = context.querySelectorAll(selector);
  return context.matches?.(selector) ? [context, ...descendants] : descendants;
}

Drupal.behaviors.containerViewportState = {
  attach(context) {
    if (typeof IntersectionObserver === 'undefined') return;

    const containers = once(onceId, containersIn(context));
    if (!containers.length) return;

    observer ??= new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle('active', isIntersecting);
          if (isIntersecting) target.classList.add('scrolled');
        });
      },
      { threshold: 0.1 },
    );
    containers.forEach((container) => observer.observe(container));
  },

  detach(context, settings, trigger) {
    if (trigger !== 'unload' || !observer) return;

    once.remove(onceId, containersIn(context)).forEach((container) => {
      observer.unobserve(container);
    });
  },
};
