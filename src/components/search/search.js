const searchLayoutObservers = new WeakMap();
const desktopSearchSelector = '.header__search';

function desktopSearchesWithin(context) {
  return context.matches?.(desktopSearchSelector)
    ? [context]
    : [...context.querySelectorAll(desktopSearchSelector)];
}

// Search component behavior for header
Drupal.behaviors.headerSearch = {
  attach(context) {
    // Helper to close search form
    const closeSearch = () => {
      document.querySelectorAll('.header.search-active').forEach((header) => {
        header
          .querySelectorAll('.search__toggle')
          .forEach((t) => t.setAttribute('aria-expanded', 'false'));
        header
          .querySelector('.search__form__wrapper')
          ?.setAttribute('aria-hidden', 'true');
        header.classList.remove('search-active');
      });
    };

    // Helper to handle search form location
    const handleSearchLocation = (desktopSearch) => {
      const header = desktopSearch.closest('.header');
      const searchForm = header?.querySelector('.search__form');
      const desktopContainer = desktopSearch.querySelector(
        '.search__form__wrapper',
      );
      const mobileContainer = header?.querySelector(
        '.header__menu > nav > div',
      );

      if (!searchForm || !mobileContainer || !desktopContainer) return;

      const container =
        getComputedStyle(desktopSearch).display === 'none'
          ? mobileContainer
          : desktopContainer;
      if (searchForm.parentElement !== container) {
        container.prepend(searchForm);
        closeSearch();
      }
    };

    const desktopSearches = new Set(desktopSearchesWithin(context));
    const closestDesktopSearch = context
      .closest?.('.header')
      ?.querySelector(desktopSearchSelector);
    if (closestDesktopSearch) desktopSearches.add(closestDesktopSearch);
    desktopSearches.forEach(handleSearchLocation);

    once('header-search-layout', [...desktopSearches]).forEach(
      (desktopSearch) => {
        const observer = new ResizeObserver(() =>
          handleSearchLocation(desktopSearch),
        );
        observer.observe(desktopSearch);
        searchLayoutObservers.set(desktopSearch, observer);
      },
    );

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
          header
            .querySelector('.search__form__wrapper')
            ?.setAttribute('aria-hidden', 'false');
        }
      });
    });

    // Global listeners.
    if (!window.headerSearchInitialized) {
      window.headerSearchInitialized = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
      });
    }
  },
  detach(context, settings, trigger) {
    if (trigger !== 'unload') return;

    once
      .remove('header-search-layout', desktopSearchesWithin(context))
      .forEach((desktopSearch) => {
        searchLayoutObservers.get(desktopSearch)?.disconnect();
        searchLayoutObservers.delete(desktopSearch);
      });
  },
};
