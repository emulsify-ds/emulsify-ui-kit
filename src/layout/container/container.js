Drupal.behaviors.bgImageAnimate = {
  attach(context) {
    // Provides accessible friendly text for pagers.
    const containers = context.querySelectorAll('.container');

    if (containers) {
      const observer = new IntersectionObserver(
        function triggerActive(wrappers) {
          wrappers.forEach((container) => {
            if (container.isIntersecting) {
              container.target.classList.add('active');
            } else {
              container.target.classList.remove('active');
            }
          });
        },
        { threshold: 0.1 },
      );
      containers.forEach((container) => {
        observer.observe(container);
      });
    }
  },
};
