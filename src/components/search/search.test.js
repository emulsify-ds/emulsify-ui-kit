import once from '../../../node_modules/@drupal/once/src/once.js';

const { jest } = import.meta;

test('moves header search with its CSS layout and observes each region once', async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  const observe = jest.fn();
  const disconnect = jest.fn();
  globalThis.ResizeObserver = jest.fn(() => ({ observe, disconnect }));

  document.body.innerHTML = `
    <header class="header">
      <div class="header__menu"><nav><div></div></nav></div>
      <div class="header__search" style="display: none">
        <button class="search__toggle" aria-expanded="false"></button>
        <div class="search__form__wrapper" aria-hidden="true">
          <form class="search__form"><input type="search"></form>
        </div>
      </div>
    </header>`;

  await import('./search.js');
  const behavior = Drupal.behaviors.headerSearch;
  const desktopSearch = document.querySelector('.header__search');
  const desktopSlot = document.querySelector('.search__form__wrapper');
  const mobileSlot = document.querySelector('.header__menu > nav > div');
  const form = document.querySelector('.search__form');
  const toggle = document.querySelector('.search__toggle');

  behavior.attach(document);
  behavior.attach(desktopSearch);
  expect(form.parentElement).toBe(mobileSlot);
  expect(observe).toHaveBeenCalledTimes(1);
  expect(observe).toHaveBeenCalledWith(desktopSearch);

  const onResize = ResizeObserver.mock.calls[0][0];
  desktopSearch.style.display = 'block';
  onResize();
  expect(form.parentElement).toBe(desktopSlot);
  toggle.click();
  onResize();
  expect(toggle.getAttribute('aria-expanded')).toBe('true');

  desktopSearch.style.display = 'none';
  onResize();
  expect(form.parentElement).toBe(mobileSlot);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');

  behavior.detach(desktopSearch, {}, 'unload');
  expect(disconnect).toHaveBeenCalledTimes(1);
  behavior.attach(desktopSearch);
  expect(observe).toHaveBeenCalledTimes(2);
  behavior.detach(desktopSearch, {}, 'unload');
});
