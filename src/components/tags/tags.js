Drupal.behaviors.tags = {
  /**
   * Attaches the tags behavior to the given context.
   * @param {HTMLElement} context - The context to which the behavior is attached.
   */
  attach(context) {
    const tags = context.querySelectorAll('[data-tag-color]');
    tags.forEach((tag) => {
      const { dataset } = tag;
      if (!dataset.scrollProcessed && dataset.tagColor) {
        dataset.scrollProcessed = true;

        tag.style.backgroundColor = dataset.tagColor;
      }
    });
  },
};
