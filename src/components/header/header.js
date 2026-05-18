Drupal.behaviors.siteHeader = {
  attach(context) {
    // Helper to close open submenus
    const closeSubmenus = () => {
      document.querySelectorAll('.header__menu-item.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('.header__menu-item__toggle')?.setAttribute('aria-expanded', 'false');
      });
    };

    // Helper to close search form
    const closeSearch = () => {
      document.querySelectorAll('.header.search-active').forEach((header) => {
        header.classList.remove('search-active');
        header.querySelectorAll('.header__search-form__toggle').forEach((t) => t.setAttribute('aria-expanded', 'false'));
        header.querySelector('.header__search-form__wrapper')?.setAttribute('aria-hidden', 'true');
      });
    };

    // Helper to close mobile menu
    const closeMobileMenu = () => {
      document.querySelectorAll('.header.menu-active').forEach((header) => {
        header.classList.remove('menu-active');
        header.querySelectorAll('.header__mobile-menu__toggle').forEach((t) => t.setAttribute('aria-expanded', 'false'));
      });
    };

    // Helper to close everything
    const closeAll = () => {
      closeSubmenus();
      closeSearch();
      closeMobileMenu();
    };

    // Helper to handle mobile-only links in submenus
    const handleMobileLinks = () => {
      const isMobile = window.innerWidth < 1040;
      document.querySelectorAll('.header__menu-item').forEach((item) => {
        const submenu = item.querySelector('.header__menu-item__submenu');
        if (!submenu) return;

        const mobileLink = submenu.querySelector('.header__submenu-item--mobile-only');

        if (isMobile) {
          if (!mobileLink) {
            const link = item.querySelector('.header__menu-item__link');
            if (link && link.getAttribute('href')) {
              const li = document.createElement('li');
              li.className = 'header__submenu-item header__submenu-item--mobile-only';
              li.innerHTML = `<a class="header__submenu-item__link" href="${link.getAttribute('href')}">${link.textContent.trim()}</a>`;
              submenu.insertBefore(li, submenu.firstChild);
            }
          }
        } else if (mobileLink) {
          mobileLink.remove();
        }
      });
    };

    // Helper to handle search form location
    const handleSearchLocation = () => {
      const isMobile = window.innerWidth < 1040;
      const searchForm = document.querySelector('.header__search-form__wrapper');
      const desktopContainer = document.querySelector('.header__search--desktop');
      const mobileContainer = document.querySelector('.header__search--mobile');

      if (!searchForm || !mobileContainer || !desktopContainer) return;

      if (isMobile) {
        if (searchForm.parentElement !== mobileContainer) {
          mobileContainer.appendChild(searchForm);
        }
      } else {
        if (searchForm.parentElement !== desktopContainer) {
          desktopContainer.appendChild(searchForm);
        }
      }
    };

    // Initial calls
    handleMobileLinks();
    handleSearchLocation();

    // Menu Toggles
    context.querySelectorAll('.header__menu-item').forEach((item) => {
      const toggle = item.querySelector('.header__menu-item__toggle');
      if (!toggle) return;

      if (item.dataset.jsProcessed) return;
      item.dataset.jsProcessed = true;

      item.addEventListener('click', (e) => {
        // Desktop behavior: only trigger if button was clicked
        if (window.innerWidth >= 1040 && !e.target.closest('.header__menu-item__toggle')) return;

        // Mobile behavior: clicking the whole item toggles
        e.stopPropagation();
        
        // Prevent default for top-level link on mobile if it has a submenu
        if (window.innerWidth < 1040 && e.target.closest('.header__menu-item__link')) {
          e.preventDefault();
        }

        const isOpening = !item.classList.contains('open');

        closeSubmenus();
        closeSearch();

        if (isOpening) {
          item.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Search Toggles
    context.querySelectorAll('.header__search-form__toggle').forEach((toggle) => {
      if (toggle.dataset.jsProcessed) return;
      toggle.dataset.jsProcessed = true;

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const header = toggle.closest('.header');
        const isOpening = !header.classList.contains('search-active');

        closeAll();

        if (isOpening) {
          header.classList.add('search-active');
          toggle.setAttribute('aria-expanded', 'true');
          header.querySelector('.header__search-form__wrapper')?.setAttribute('aria-hidden', 'false');
          header.querySelector('input[type="search"]')?.focus();
        }
      });
    });

    // Mobile Menu Toggles
    context.querySelectorAll('.header__mobile-menu__toggle').forEach((toggle) => {
      if (toggle.dataset.jsProcessed) return;
      toggle.dataset.jsProcessed = true;

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const header = toggle.closest('.header');
        const isOpening = !header.classList.contains('menu-active');

        closeAll();

        if (isOpening) {
          header.classList.add('menu-active');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Global listeners.
    if (!window.siteHeaderInitialized) {
      window.siteHeaderInitialized = true;
      
      const mediaQuery = window.matchMedia('(min-width: 1040px)');
      const handleBreakpointChange = () => {
        closeAll();
        handleMobileLinks();
        handleSearchLocation();
      };
      
      mediaQuery.addEventListener('change', handleBreakpointChange);

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header__menu-item')) closeSubmenus();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
      });
    }
  },
};
