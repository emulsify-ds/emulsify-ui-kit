Drupal.behaviors.menuToggle = {
  attach(context) {
    // Selectors
    const menu = context.querySelectorAll('.menu-with-toggle');

    // Function to trap focus when mobile menu is expanded.
    function trapKeyboard(menuItem) {
      if (menuItem.nextElementSibling) {
        const focusableElements = menuItem.nextElementSibling.querySelectorAll(
          'button, [href], [tabindex]',
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1];

        menuItem.nextElementSibling.addEventListener('keydown', (e) => {
          const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        });
      }
    }

    // Toggle aria-expanded attribute.
    function toggleAria(el) {
      // el may be a placeholder <span> so we need to target the button
      const button = el.parentElement.querySelector('[class*="__toggle"]');
      const list = el.parentElement.querySelector(
        '[class*="__menu-list-wrapper"]',
      );

      // reset all existing items
      Array.prototype.forEach.call(menu, (m) => {
        Array.prototype.forEach.call(
          m
            .querySelector('[class*="__menu-list-wrapper"]')
            .querySelectorAll('[class*="__toggle"]'),
          (i) => {
            if (i.outerHTML !== button.outerHTML && i.nextElementSibling) {
              i.setAttribute('aria-expanded', 'false');
              i.nextElementSibling.setAttribute('aria-hidden', 'true');
            }
          },
        );
      });

      button.setAttribute(
        'aria-expanded',
        button.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
      );

      if (button.getAttribute('aria-expanded') === 'false') {
        list.setAttribute('aria-hidden', 'true');
      } else {
        list.setAttribute('aria-hidden', 'false');
      }
    }

    function toggleMenu(el, menuName) {
      const menuItems = context.querySelectorAll(`.${menuName}__item`);

      // Tell global nav what level is active.
      let menuLevel = '';
      if (el.getAttribute('data-menu-level')) {
        menuLevel = el.getAttribute('data-menu-level');
      } else {
        menuLevel = el.nextElementSibling.getAttribute('data-menu-level');
      }
      // Reset any open levels.
      Array.prototype.forEach.call(menu, (m) => {
        m.setAttribute('data-menu-level', menuLevel);
      });

      // Primary toggle for the whole menu tree.
      if (el.parentElement.hasAttribute('aria-labelledby')) {
        el.parentElement.classList.toggle('menu--open');
        // Reset any open levels.
        Array.prototype.forEach.call(menuItems, (item) => {
          item.classList.remove('sub--open');
        });
        // Toggle the button label.
        const label = el.lastElementChild;
        if (el.getAttribute('aria-expanded') === 'true') {
          label.innerText = 'Close';
        } else {
          label.innerText = el.getAttribute('aria-label');
        }
      }
      // Expand/arrow navigation.
      else if (
        el.nextElementSibling &&
        el.nextElementSibling.classList.contains(
          `${menuName}__menu-list-wrapper`,
        )
      ) {
        Array.prototype.forEach.call(menuItems, (item) => {
          if (
            item.innerText !== el.parentElement.innerText &&
            item.classList.contains('sub--open') &&
            !item.contains(el)
          ) {
            item.classList.remove('sub--open');
          }
        });
        el.parentElement.classList.toggle('sub--open');
      }
      // Expand/placeholder navigation.
      else if (
        el.nextElementSibling &&
        el.nextElementSibling.nextElementSibling &&
        el.nextElementSibling.nextElementSibling.classList.contains(
          `${menuName}__menu-list-wrapper`,
        )
      ) {
        Array.prototype.forEach.call(menuItems, (item) => {
          if (
            item.innerText !== el.parentElement.innerText &&
            item.classList.contains('sub--open')
          ) {
            item.classList.remove('sub--open');
          }
        });
        el.parentElement.classList.toggle('sub--open');
      }
      // Back to [level] toggle.
      else {
        Array.prototype.forEach.call(menuItems, (item) => {
          if (
            item.innerText !== el.parentElement.innerText &&
            item.classList.contains('sub--open')
          ) {
            item.classList.remove('sub--open');
          }
        });
        el.parentElement.classList.toggle('sub--open');
      }
    }

    // eslint-disable-next-line func-names
    const observer = new MutationObserver(function (mutations) {
      // eslint-disable-next-line func-names
      mutations.forEach(function (mutation) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const placeholder = mutation.target.querySelector(
            '[class*="__placeholder"]',
          );
          const submenu = mutation.target.querySelector(
            '[class*="__menu-list-wrapper"]',
          );
          if (submenu && placeholder) {
            if (mutation.target.classList.contains('sub--open')) {
              // Check if the menus are cut off on right side of page.
              const rect = submenu.getBoundingClientRect();
              const diff = window.innerWidth - rect.right;
              if (diff < 0) {
                submenu.style.transform = `translateX(${diff}px)`;
                placeholder.classList.add('cut');
              }
            } else {
              submenu.style.transform = 'translateX(0)';
              placeholder.classList.remove('cut');
            }
          }
        }
      });
    });

    // Toggle mobile menu classes when clicked.
    if (menu) {
      Array.prototype.forEach.call(menu, (m) => {
        const toggleExpand = m.querySelectorAll('[class*="__toggle"]');
        Array.prototype.forEach.call(toggleExpand, (item) => {
          item.addEventListener('click', () => {
            toggleAria(item);
            trapKeyboard(item);
            toggleMenu(item, m.id);
          });
        });

        const placeholderItem = m.querySelectorAll('[class*="__placeholder"]');
        Array.prototype.forEach.call(placeholderItem, (item) => {
          item.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
              event.preventDefault();
              item.click();
            }
          });
          item.addEventListener('click', () => {
            toggleAria(item);
            trapKeyboard(item);
            toggleMenu(item, m.id);
          });
        });

        const menuItem = m.querySelectorAll('[class*="__item--with-sub"]');
        Array.prototype.forEach.call(menuItem, (item) => {
          observer.observe(item, {
            attributes: true,
          });
        });
      });
      document.onkeydown = (evt) => {
        if (evt.key === 'Escape') {
          // Reset any open levels.
          Array.from(context.querySelectorAll('[class*="__item"]')).forEach(
            (g) => g.classList.remove('sub--open'),
          );
          context.querySelector('body').removeAttribute('data-body-frozen');
          // Reset all aria-expanded.
          Array.prototype.forEach.call(menu, (m) => {
            m.classList.remove('menu--open');
            Array.prototype.forEach.call(
              m.querySelectorAll('button, [href], [tabindex]'),
              (i) => {
                i.setAttribute('aria-expanded', 'false');
              },
            );

            Array.prototype.forEach.call(
              m
                .querySelector('[class*="__menu-list-wrapper"]')
                .querySelectorAll('[class*="__menu-list-wrapper"]'),
              (i) => {
                i.setAttribute('aria-hidden', 'true');
              },
            );
          });
        }
      };
    }
  },
};
