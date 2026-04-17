Drupal.behaviors.accordion = {
  attach(context) {
    const items = context.querySelectorAll('.js-accordion-item');
    const controls = context.querySelectorAll('.accordion__controls__item');
    const itemToggle = '.js-accordion-item__toggle';
    const itemContent = '.accordion-item__content';
    const itemState = 'data-accordion-expanded';
    const buttonState = 'aria-expanded';
    const contentState = 'aria-hidden';

    const expand = (item, button, content) => {
      item.setAttribute(itemState, 'true');
      button.setAttribute(buttonState, 'true');
      content.setAttribute(contentState, 'false');
    };

    const collapse = (item, button, content) => {
      item.setAttribute(itemState, 'false');
      button.setAttribute(buttonState, 'false');
      content.setAttribute(contentState, 'true');
    };

    // Get base URL and anchor (unchanged)
    function getUrl() {
      return (
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      );
    }

    function getAnchor() {
      return document.URL.split('#').length > 1
        ? document.URL.split('#')[1]
        : null;
    }

    // Utility to update aria-disabled on "Expand all" / "Collapse all"
    const updateControlStates = (accordionRoot) => {
      const expandButton = accordionRoot.querySelector(
        '.js-accordion__toggle-all--expand',
      );
      const collapseButton = accordionRoot.querySelector(
        '.js-accordion__toggle-all--collapse',
      );
      const allItems = accordionRoot.querySelectorAll('.js-accordion-item');

      const allExpanded = Array.from(allItems).every(
        (item) => item.getAttribute(itemState) === 'true',
      );
      const allCollapsed = Array.from(allItems).every(
        (item) => item.getAttribute(itemState) === 'false',
      );

      // Set aria-disabled accordingly
      if (expandButton) {
        expandButton.setAttribute(
          'aria-disabled',
          allExpanded ? 'true' : 'false',
        );
      }
      if (collapseButton) {
        collapseButton.setAttribute(
          'aria-disabled',
          allCollapsed ? 'true' : 'false',
        );
      }
    };

    // Initialize accordion items
    items.forEach((item) => {
      const button = item.querySelector(itemToggle);
      const content = item.querySelector(itemContent);
      const accordionRoot = item.closest('.accordion');

      collapse(item, button, content);

      if (item.getAttribute('id') && item.getAttribute('id') === getAnchor()) {
        expand(item, button, content);
      }

      button.addEventListener('click', () => {
        const anchor = item.id;
        const newUrl = `${getUrl()}#${anchor}`;

        // Update URL hash
        if (window.location.href !== newUrl) {
          window.history.replaceState('', '', newUrl);
        } else {
          window.history.replaceState(
            '',
            '',
            window.location.origin + window.location.pathname,
          );
        }

        // Toggle state
        if (button.getAttribute(buttonState) === 'true') {
          collapse(item, button, content);
        } else {
          expand(item, button, content);
        }

        // Update control buttons state after toggling
        updateControlStates(accordionRoot);
      });
    });

    // Initialize control buttons (Expand All / Collapse All)
    controls.forEach((control) => {
      const accordionRoot = control.closest('.accordion');
      const allItems = accordionRoot.querySelectorAll('.js-accordion-item');
      const toggleAllButton = control.querySelector(
        '.js-accordion-item__toggle_all',
      );

      toggleAllButton.addEventListener('click', (e) => {
        const action = e.target.classList.contains(
          'js-accordion__toggle-all--expand',
        );

        allItems.forEach((item) => {
          const button = item.querySelector(itemToggle);
          const content = item.querySelector(itemContent);
          if (action) {
            expand(item, button, content);
          } else {
            collapse(item, button, content);
          }
        });

        // Refresh aria-disabled states after bulk toggle
        updateControlStates(accordionRoot);
      });

      // Initialize on page load
      updateControlStates(accordionRoot);
    });
  },
};
