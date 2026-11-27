Drupal.behaviors.tags = {
  attach(context) {
    const selector = '.tags__link[data-tag-custom-color]';
    const tags = [...context.querySelectorAll(selector)];
    if (context.matches?.(selector)) tags.unshift(context);

    once('emulsify-tag-color', tags).forEach((tag) => {
      const color = tag.dataset.tagCustomColor;
      if (CSS.supports('color', color)) {
        tag.style.setProperty('--tags-accent', color);
      }
    });
  },
};
