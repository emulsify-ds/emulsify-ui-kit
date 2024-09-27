Drupal.behaviors.tabs = {
  attach(context) {
    const el = context.querySelectorAll('.tabs');

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
     * @return The string value after the hash.
     */
    function getAnchor() {
      return document.URL.split('#').length > 1
        ? document.URL.split('#')[1]
        : null;
    }

    /**
     * init
     * @description Initializes the component by removing the no-js class from
     *   the component, and attaching event listeners to each of the nav items.
     *   Returns nothing.
     */
    if (el.length) {
      el.forEach((e) => {
        e.classList.remove('no-js');

        const tabNavigationLinks = e.querySelectorAll('.tab__link');
        const tabContentContainers = e.querySelectorAll('.tabs__tab__content');
        let activeIndex = 0;

        tabNavigationLinks.forEach((link, index) => {
          const anchor = link.href.split('#');
          // eslint-disable-next-line
          const newUrl = `${getUrl()}` + '#' + `${anchor[1]}`;

          link.addEventListener('click', (l) => {
            l.preventDefault();

            if (
              index !== activeIndex &&
              index >= 0 &&
              index <= tabNavigationLinks.length
            ) {
              tabNavigationLinks[Number(activeIndex)].classList.remove(
                'is-active',
              );
              tabNavigationLinks[Number(index)].classList.add('is-active');
              tabContentContainers[Number(activeIndex)].classList.remove(
                'is-active',
              );
              tabContentContainers[Number(index)].classList.add('is-active');
              activeIndex = index;
            }
            window.history.replaceState('', '', newUrl);
          });

          if (anchor[1] === getAnchor()) {
            link.click();
          }
        });

        tabContentContainers.forEach((tabContent) => {
          if (tabContent.id === getAnchor()) {
            const tabLink = context.querySelector(
              `a[href="#${tabContent.id}"]`,
            );
            tabLink.click();
          }
        });
      });
    }
  },
};

Drupal.behaviors.tabsNavScroll = {
  attach(context) {
    // Selectors.
    const tabsGroup = context.querySelectorAll('.tabs');
    if (!tabsGroup) {
      return;
    }

    tabsGroup.forEach((tabs) => {
      const tabsWrapper = tabs.querySelector('.tabs__wrapper');
      const tabsNav = tabs.querySelector('.tabs__nav');
      const tabsControls = tabs.querySelectorAll('.tabs__scroll');
      const tabsLinks = tabs.querySelectorAll('.tab__link');
      const controlsWidth = tabs.querySelector(
        '.tabs__scroll--left',
      ).offsetWidth;
      let scrollIndicatorDir;
      /**
       * getFirstVisible
       * @description Get the first item that is visible (not overflown).
       * @return The value of the left edge of the first fully visible item plus
       * the width of the controls so that things aren't visually hidden by the
       * absolutely positioned elements.
       */
      function getFirstVisible() {
        const tabsLeft = tabsNav.getBoundingClientRect().left;
        const tabsItems = tabsNav.querySelectorAll('.tabs__tab');
        const visibleItems = [];

        tabsItems.forEach((item) => {
          if (item.getBoundingClientRect().left > tabsLeft + controlsWidth) {
            visibleItems.push(item);
          }
        });

        return visibleItems[1].offsetLeft - controlsWidth;
      }

      /**
       * getLastHidden
       * @description Get the last item that is overflown (not visible).
       * @return The value of the left edge of the first partially hidden item
       * minus the width of the controls so that things aren't visually hidden by
       * the absolutely positioned elements.
       */
      function getLastHidden() {
        const tabsLeft = tabsNav.getBoundingClientRect().left;
        const tabsItems = tabsNav.querySelectorAll('.tabs__tab');
        const hiddenItems = [];

        tabsItems.forEach((item) => {
          if (item.getBoundingClientRect().left < tabsLeft) {
            hiddenItems.push(item);
          }
        });

        return hiddenItems[hiddenItems.length - 1].offsetLeft - controlsWidth;
      }

      /**
       * setOverflow
       * @description Get the positions of the tabsy_nav to determine whether an
       * overflow situation is in play.
       */
      function setOverflow() {
        if (tabsWrapper) {
          const tabsLeft = tabsWrapper.getBoundingClientRect().left;
          const tabsRight = tabsWrapper.getBoundingClientRect().right;
          const firsttabsLeft = tabs
            .querySelector('.tabs__tab:first-child')
            .getBoundingClientRect().left;
          const lasttabsRight = Math.floor(
            tabs.querySelector('.tabs__tab:last-child').getBoundingClientRect()
              .right,
          );

          if (firsttabsLeft < tabsLeft) {
            // If left side of first tabsy_item is < left side of tabsy_nav.
            // And right side of last tabsy_item is > right side of tabsy_nav.
            if (lasttabsRight > tabsRight) {
              if (scrollIndicatorDir !== 'both') {
                scrollIndicatorDir = 'both';
                tabsWrapper.setAttribute('data-scroll-indicator', 'both');
              }
              // If left side of first tabsy_item is < left side of tabsy_nav.
              // But right side of last tabsy_item is <= right side of tabsy_nav.
            } else if (scrollIndicatorDir !== 'left') {
              scrollIndicatorDir = 'left';
              tabsWrapper.setAttribute('data-scroll-indicator', 'left');
            }
            // If left side of first tabsy_item is >= left side of tabsy_nav.
            // And right side of last tabsy_item is > right side of tabsy_nav.
          } else if (lasttabsRight > tabsRight) {
            if (scrollIndicatorDir !== 'right') {
              scrollIndicatorDir = 'right';
              tabsWrapper.setAttribute('data-scroll-indicator', 'right');
            }
            // If left side of first tabsy_item is >= left side of tabsy_nav.
            // And right side of last tabsy_item is <= right side of tabsy_nav.
          } else {
            scrollIndicatorDir = 'none';
            tabsWrapper.setAttribute('data-scroll-indicator', 'none');
          }
        }
      }

      /**
       * mouseNav
       * @description Support mouse navigation when horizontal scrolling occurs.
       */
      function mouseNav(direction) {
        tabsNav.scrollLeft =
          direction === 'right' ? getFirstVisible() : getLastHidden();
      }

      /**
       * ensureVisible
       * @description Ensure the focused tab is fully visible (not overflown).
       * @param {HTMLElement} item The focused item.
       */
      function ensureVisible(item) {
        const tabsLeft = tabsWrapper.getBoundingClientRect().left;
        const tabsRight = tabsWrapper.getBoundingClientRect().right;

        // if right side overflows control, set to left + control.
        if (
          Math.floor(item.getBoundingClientRect().right) >
          tabsRight - controlsWidth
        ) {
          // If overflow right or both.
          if (
            tabsWrapper.getAttribute('data-scroll-indicator') === 'right' ||
            tabsWrapper.getAttribute('data-scroll-indicator') === 'both'
          ) {
            tabsWrapper.scrollLeft =
              item.parentElement.offsetLeft - controlsWidth;
          }
        }
        // If left side overflows control, set to left + control.
        else if (
          Math.floor(item.getBoundingClientRect().left) <
          tabsLeft + controlsWidth
        ) {
          // If overflow left or both.
          if (
            tabsWrapper.getAttribute('data-scroll-indicator') === 'left' ||
            tabsWrapper.getAttribute('data-scroll-indicator') === 'both'
          ) {
            tabsWrapper.scrollLeft =
              item.parentElement.offsetLeft - controlsWidth;
          }
        }
      }

      /**
       * debounce
       * @description Debounce to only run a function at most once every 200ms.
       * @param {} func The function to be run after the timeout.
       */
      function debounce(func) {
        let timer;
        return function debounceFunction(event) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(func, 200, event);
        };
      }

      /**
       * linksListeners
       * @description Support focus visualization.
       */
      tabsLinks.forEach((link) => {
        link.addEventListener('focus', () => {
          ensureVisible(link);
        });
      });

      /**
       * init
       */
      setOverflow();

      tabsControls.forEach((control) => {
        control.addEventListener('click', (e) => {
          e.preventDefault();
          setOverflow();
          if (control.classList.contains('tabs__scroll--right')) {
            mouseNav('right');
          } else {
            mouseNav('left');
          }
        });
      });

      tabsNav.addEventListener('scroll', () => {
        setOverflow();
      });

      tabsNav.addEventListener('scroll', () => {
        if (window.innerWidth > 1040) {
          setOverflow();
        }
      });

      // Listen for window resize.
      window.addEventListener(
        'resize',
        debounce(function resizeListener() {
          setOverflow();
        }),
      );
    });
  },
};
