// Search component behavior for header
Drupal.behaviors.headerSearch = {
  attach(context) {
    // Helper to close search form
    const closeSearch = () => {
      document.querySelectorAll('.header.search-active').forEach((header) => {
        header.querySelectorAll('.search__toggle').forEach((t) => t.setAttribute('aria-expanded', 'false'));
        header.querySelector('.search__form__wrapper')?.setAttribute('aria-hidden', 'true');
        header.classList.remove('search-active');
      });
    };

    // Helper to handle search form location
    const handleSearchLocation = () => {
      const isMobile = window.innerWidth < 1040;
      const searchForm = document.querySelector('.search__form');
      const desktopContainer = document.querySelector('.search__form__wrapper');
      const mobileContainer = document.querySelector('.header__menu > nav > div');

      if (!searchForm || !mobileContainer || !desktopContainer) return;

      if (isMobile) {
        if (searchForm.parentElement !== mobileContainer) {
          mobileContainer.prepend(searchForm);
        }
      } else {
        if (searchForm.parentElement !== desktopContainer) {
          desktopContainer.prepend(searchForm);
        }
      }
    };

    // Initial calls
    handleSearchLocation();

    // Search Toggles
    context.querySelectorAll('.search__toggle').forEach((toggle) => {
      if (toggle.dataset.jsProcessed) return;
      toggle.dataset.jsProcessed = true;
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const header = toggle.closest('.header');
        const isOpening = !header.classList.contains('search-active');
        closeSearch();
        if (isOpening) {
          header.classList.add('search-active');
          toggle.setAttribute('aria-expanded', 'true');
          header.querySelector('input[type="search"]')?.focus();
          header.querySelector('.search__form__wrapper')?.setAttribute('aria-hidden', 'false');
        }
      });
    }); 

    // Global listeners.
    if (!window.headerSearchInitialized) {
      window.headerSearchInitialized = true;
      const mediaQuery = window.matchMedia('(min-width: 1040px)');
      const handleBreakpointChange = () => {
        handleSearchLocation();
        closeSearch();
      };

      mediaQuery.addEventListener('change', handleBreakpointChange);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
      });
    }
  }
};
