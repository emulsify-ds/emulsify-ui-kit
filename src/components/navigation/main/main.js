/* eslint-disable no-param-reassign */
Drupal.behaviors.mainNav = {
  attach(context) {
    if (context !== document && !context.querySelector('#main-nav')) {
      context = document;
    }

    // Selectors
    const body = context.querySelector('body') || document.body;
    const menu = context.querySelector('#main-nav');
    if (!menu) return;

    const menuList = context.querySelector(
      '#main-nav > .main-nav__menu-list-wrapper > .main-nav__menu-list',
    );
    const utility = context.querySelector('.utility_nav__menu-list');
    const search = context.querySelector('.search-block-form');
    const siteHeader = context.querySelector('.site-header');
    // Primary toggle for the whole menu tree.
    const menuPrimaryToggle = context.querySelector('#main-nav > button');
    const searchToggle = context.querySelectorAll('.search-form__toggle');

    /**
     * setIconButton
     * @description Set the icon to the search button.
     * @param {HTMLElement} button The focused item.
     * @param {string} iconName Icon name in theme assets.
     */
    function setIconButton(button, iconName) {
      const svg = button.querySelector('svg');
      if (!svg) return;
      const icon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      const iconUse = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use',
      );
      iconUse.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        `/themes/custom/smith/dist/icons-1.svg#${iconName}`,
      );
      icon.appendChild(iconUse);
      svg.outerHTML = icon.outerHTML;
    }

    /**
     * toggleSearchBar
     * @description Toggle search form visibility.
     * @param {boolean} newState Condition for adding/removing the 'open' class.
     * @param {HTMLElement} button The focused item.
     */
    function toggleSearchBar(newState) {
      Array.from(document.querySelectorAll('.search-form__toggle')).forEach(
        (button) => {
          button.classList.toggle('open', newState);
          setIconButton(button, newState ? 'close' : 'search');
        },
      );
      if (search) {
        search.classList.toggle('open', newState);
        // Add/remove focus to the text input of the search form.
        const searchInput = search.querySelector('input');
        if (searchInput) {
          if (newState) searchInput.focus();
          else searchInput.blur();
        }
      }
    }

    if (menuPrimaryToggle && !menuPrimaryToggle.dataset.navProcessed) {
      menuPrimaryToggle.dataset.navProcessed = 'true';

      if (
        utility &&
        menuList &&
        !menuList.querySelector('.utility_nav__menu-list')
      ) {
        // Clone utility into the correct location for mobile.
        const utilityClone = utility.cloneNode(true);
        menuList.after(utilityClone);
      }
      // scroll down to the main menu if alerts are present.
      menuPrimaryToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded =
          menuPrimaryToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;

        menuPrimaryToggle.setAttribute('aria-expanded', String(newState));
        menu.classList.toggle('menu--open', newState);
        body.toggleAttribute('data-body-frozen', newState);

        if (siteHeader && !siteHeader.classList.contains('stuck') && newState) {
          context
            .querySelector('.site-header__container')
            .scrollIntoView(true, {
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
        }
      });

      // Toggle functionality for submenus.
      Array.from(menu.querySelectorAll(`.${menu.id}__item`)).forEach((item) => {
        const toggleButton = item.querySelector('button');
        if (!toggleButton) return;

        toggleButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isSubOpen = item.classList.contains('sub--open');

          // Opcional: Cierra otros submenús abiertos al mismo nivel si es necesario
          Array.from(item.parentNode.children).forEach((sibling) => {
            if (sibling !== item) {
              sibling.classList.remove('sub--open');
              const siblingBtn = sibling.querySelector('button');
              if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
            }
          });

          item.classList.toggle('sub--open', !isSubOpen);
          toggleButton.setAttribute('aria-expanded', String(!isSubOpen));
        });
      });
    }

    if (searchToggle) {
      // Search button handler.
      Array.prototype.forEach.call(searchToggle, (toggle) => {
        if (!toggle.dataset.searchProcessed) {
          toggle.dataset.searchProcessed = 'true';

          toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (toggle.classList.contains('open')) {
              toggleSearchBar(false);
            } else {
              toggleSearchBar(true);
            }
          });
        }
      });
    }

    if (context === document) {
      // Hide menu when escape key press.
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          if (menuPrimaryToggle && menu.classList.contains('menu--open')) {
            menuPrimaryToggle.click();
          }
          toggleSearchBar(false);
        }
      });

      window.addEventListener('click', (e) => {
        if (menu && !menu.contains(e.target)) {
          if (menu.classList.contains('menu--open')) {
            // Reset any open levels.
            Array.from(
              document.getElementsByClassName(`${menu.id}__item`),
            ).forEach((g) => g.classList.remove('sub--open'));
            // Reset all aria-expanded.
            Array.prototype.forEach.call(
              menu.querySelectorAll('button, [href], [tabindex]'),
              (i) => {
                i.setAttribute('aria-expanded', 'false');
              },
            );
            // Prevent body scrolling when menu it active.
            body.removeAttribute('data-body-frozen');
            menu.classList.remove('menu--open');
          }
        }
        // Reset all extended search bar.
        if (
          search &&
          !search.contains(e.target) &&
          !e.target.classList.contains('search-form__toggle') &&
          !e.target.closest('.search-form__toggle')
        ) {
          toggleSearchBar(false);
        }
      });
    }
  },
};
