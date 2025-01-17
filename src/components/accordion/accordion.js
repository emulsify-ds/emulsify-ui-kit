Drupal.behaviors.accordion = {
  attach(context) {
    // Selectors
    const items = context.querySelectorAll('.js-accordion-item');
    const controls = context.querySelectorAll('.accordion__controls__item');
    // Classes
    const itemToggle = '.js-accordion-item__toggle';
    const itemContent = '.accordion-item__content';
    const itemState = 'data-accordion-expanded';
    const buttonState = 'aria-expanded';
    const contentState = 'aria-hidden';

    // Function to expand an accordion item.
    const expand = (item, button, content) => {
      item.setAttribute(itemState, 'true');
      button.setAttribute(buttonState, 'true');
      content.setAttribute(contentState, 'false');
    };

    // Function to collapse an accordion item.
    const collapse = (item, button, content) => {
      item.setAttribute(itemState, 'false');
      button.setAttribute(buttonState, 'false');
      content.setAttribute(contentState, 'true');
    };

    /* eslint-disable */
    /**
     * getUrl
     * @description Get the value of the anchor link in the URL.
     * @returns The string value after the hash.
     */
    function getUrl() {
      return (
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      );
    }
    /* eslint-enable */

    /**
     * getAnchor
     * @description Get the value of the anchor link in the URL.
     * @return {string} The string value after the hash.
     */
    function getAnchor() {
      return document.URL.split('#').length > 1
        ? document.URL.split('#')[1]
        : null;
    }

    // Toggle accordion content when toggle is activated.
    items.forEach((item) => {
      const button = item.querySelector(itemToggle);
      const content = item.querySelector(itemContent);

      const anchor = item.id;
      // eslint-disable-next-line
      const newUrl = `${getUrl()}` + '#' + `${anchor}`;

      // Hide all accordion content sections if JavaScript is enabled.
      collapse(item, button, content);

      if (item.getAttribute('id') && item.getAttribute('id') === getAnchor()) {
        expand(item, button, content);
      }

      button.addEventListener('click', () => {
        if (window.location.href !== newUrl) {
          window.history.replaceState('', '', newUrl);
        } else {
          window.history.replaceState(
            '',
            '',
            window.location.origin + window.location.pathname,
          );
        }
        // Toggle the item's state.
        return button.getAttribute(buttonState) === 'true'
          ? collapse(item, button, content)
          : expand(item, button, content);
      });
    });

    controls.forEach((control) => {
      // Get all items relevant to the control.
      const allItems =
        control.parentNode.parentNode.querySelectorAll('.js-accordion-item');
      // Add click listener on the parent <ul>
      control
        .querySelector('.js-accordion-item__toggle_all')
        .addEventListener('click', (e) => {
          // Determine which control was activated. `action` will re turn a
          // boolean. `true` if the expand control was clicked, otherwise false.
          const action = e.target.classList.contains(
            'js-accordion__toggle-all--expand',
          );

          // Iterate over
          allItems.forEach((item) => {
            const button = item.querySelector(itemToggle);
            const content = item.querySelector(itemContent);

            if (action === false) {
              collapse(item, button, content);
            } else {
              expand(item, button, content);
            }
          });
        });
    });
  },
};
