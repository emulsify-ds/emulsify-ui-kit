import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/offcanvas/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const parse = (path, id) =>
  twig.twig({ id, data: read(path), allowInlineIncludes: true, rethrow: true });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
const components = {
  '@components/cta/cta.twig': parse(
    '../cta/cta.twig',
    '@components/cta/cta.twig',
  ),
  '@components/icon/icon.twig': parse('../icon/icon.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./offcanvas.twig');

function render(props = {}) {
  document.body.innerHTML = template.render({
    offcanvas__heading: 'Workshop details',
    offcanvas__content:
      '<p>Bring a notebook.</p><a href="/hours">Opening hours</a>',
    ...props,
  });
  const wrapper = document.body.firstElementChild;
  return {
    wrapper,
    dialog: wrapper.querySelector('dialog'),
    trigger: wrapper.querySelector('[data-offcanvas-trigger]'),
    close: wrapper.querySelector('[data-offcanvas-close]'),
  };
}

let behavior;

beforeAll(async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  await import('../../../src/components/offcanvas/offcanvas.js');
  behavior = globalThis.Drupal.behaviors.emulsifyOffcanvas;
});

afterAll(() => {
  delete globalThis.Drupal;
  delete globalThis.once;
});

function mockNativeDialog(dialog) {
  // jsdom provides the open attribute but does not implement the dialog API.
  dialog.showModal = () => {
    dialog.open = true;
    dialog.dataset.testPresentation = 'modal';
  };
  dialog.show = () => {
    dialog.open = true;
    dialog.dataset.testPresentation = 'pane';
  };
  dialog.close = () => {
    dialog.open = false;
    dialog.dispatchEvent(new Event('close'));
  };
  for (const control of dialog.querySelectorAll('button, a, input')) {
    control.checkVisibility = () => !control.hidden;
  }
}

function press(target, key, options = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  target.dispatchEvent(event);
  return event;
}

test('serves a labelled inline dialog and hides both CTA controls before enhancement', () => {
  const { wrapper, dialog, trigger, close } = render({
    offcanvas__id: 'workshop-15',
    offcanvas__heading_level: 3,
    offcanvas__show_heading: false,
    offcanvas__theme__variation: 'dark',
    offcanvas__suffix: '<p>Workshop footer.</p>',
  });

  expect(wrapper.dataset.componentTheme).toBe('default dark');
  expect(dialog.open).toBe(true);
  expect(dialog.hasAttribute('aria-modal')).toBe(false);
  expect(dialog.id).toBe('workshop-15');
  expect(dialog.getAttribute('aria-labelledby')).toBe('workshop-15-heading');
  expect(dialog.querySelector('h3.visually-hidden').id).toBe(
    'workshop-15-heading',
  );
  expect(dialog.textContent).toContain('Bring a notebook.');
  expect(dialog.querySelector('footer').textContent).toContain(
    'Workshop footer.',
  );
  expect(trigger.type).toBe('button');
  expect(trigger.hidden).toBe(true);
  expect(trigger.getAttribute('aria-controls')).toBe('workshop-15');
  expect(close.type).toBe('button');
  expect(close.hidden).toBe(true);
});

test('renders custom trigger, body and footer slots', () => {
  const { dialog, trigger } = render({
    offcanvas__trigger_content: '<span>Read the details</span>',
    offcanvas__body_content: '<p>Custom notes.</p>',
    offcanvas__footer_content: '<p>Custom footer.</p>',
  });

  expect(dialog.id).toBe('offcanvas-workshop-details');
  expect(trigger.querySelector('.cta__label > span').textContent).toBe(
    'Read the details',
  );
  expect(dialog.querySelector('.offcanvas__content').textContent.trim()).toBe(
    'Custom notes.',
  );
  expect(dialog.querySelector('footer').textContent.trim()).toBe(
    'Custom footer.',
  );
});

test('once enhances a modal, wraps Tab, and restores the trigger after native dismissal', () => {
  const { wrapper, dialog, trigger, close } = render({
    offcanvas__type: 'modal',
  });
  mockNativeDialog(dialog);

  behavior.attach(wrapper);
  behavior.attach(document);
  expect(trigger.hidden).toBe(false);
  expect(dialog.open).toBe(false);
  expect(close.hidden).toBe(false);
  expect(trigger.hasAttribute('aria-controls')).toBe(false);
  trigger.focus();
  trigger.click();

  expect(dialog.dataset.testPresentation).toBe('modal');
  expect(dialog.getAttribute('aria-modal')).toBe('true');
  expect(trigger.getAttribute('aria-expanded')).toBe('true');
  expect(trigger.getAttribute('aria-controls')).toBe(dialog.id);
  expect(document.activeElement).toBe(close);

  const last = dialog.querySelector('a');
  expect(press(close, 'Tab', { shiftKey: true }).defaultPrevented).toBe(true);
  expect(document.activeElement).toBe(last);
  expect(press(last, 'Tab').defaultPrevented).toBe(true);
  expect(document.activeElement).toBe(close);

  // Native Escape closes a modal and dispatches its close event.
  expect(press(close, 'Escape').defaultPrevented).toBe(false);
  dialog.close();
  expect(trigger.getAttribute('aria-expanded')).toBe('false');
  expect(trigger.hasAttribute('aria-controls')).toBe(false);
  expect(document.activeElement).toBe(trigger);
  expect(dialog.hasAttribute('aria-modal')).toBe(false);
});

test('closes a pane with Escape or the close CTA', () => {
  const { wrapper, dialog, trigger, close } = render({
    offcanvas__type: 'pane',
    offcanvas__direction: 'bottom',
  });
  mockNativeDialog(dialog);

  behavior.attach(wrapper);
  trigger.click();
  expect(dialog.dataset.testPresentation).toBe('pane');
  expect(dialog.dataset.offcanvasDirection).toBe('bottom');
  expect(dialog.hasAttribute('aria-modal')).toBe(false);
  expect(document.activeElement).toBe(close);
  expect(press(close, 'Tab').defaultPrevented).toBe(false);
  expect(press(close, 'Escape').defaultPrevented).toBe(true);
  expect(dialog.open).toBe(false);
  expect(document.activeElement).toBe(trigger);

  trigger.click();
  close.click();
  expect(dialog.open).toBe(false);
  expect(document.activeElement).toBe(trigger);
});

test('detach restores inline content and permits reattachment', () => {
  const { wrapper, dialog, trigger, close } = render();
  mockNativeDialog(dialog);

  behavior.attach(wrapper);
  trigger.click();
  behavior.detach(wrapper, {}, 'unload');
  expect(dialog.open).toBe(true);
  expect(trigger.hidden).toBe(true);
  expect(close.hidden).toBe(true);
  expect(trigger.getAttribute('aria-controls')).toBe(dialog.id);
  trigger.click();
  expect(dialog.open).toBe(true);

  behavior.attach(wrapper);
  expect(dialog.open).toBe(false);
  trigger.click();
  expect(dialog.open).toBe(true);
  expect(document.activeElement).toBe(close);
});
