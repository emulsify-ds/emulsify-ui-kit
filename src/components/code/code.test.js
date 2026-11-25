import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const coreRequire = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(coreRequire('twig').factory());
twig.extendFilter('t', (value) => value);
const template = twig.twig({
  data: readFileSync(new URL('./code.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function render(props) {
  document.body.innerHTML = template.render(props);
  return document.querySelector('pre');
}

test('escapes HTML and preserves indentation and line breaks', () => {
  const source = '<section>\n  <p>Example & explanation</p>\n</section>';
  const panel = render({ code__content: source });

  expect(panel.querySelector('code').textContent).toBe(source);
  expect(panel.querySelector('section')).toBeNull();
});

test('exposes a keyboard-scrollable labelled region with BEM attributes', () => {
  const panel = render({
    code__content: 'npm ci',
    code__blockname: 'setup',
    code__attributes: { 'aria-label': 'Install the package' },
  });

  expect(panel.tabIndex).toBe(0);
  expect(panel.getAttribute('role')).toBe('region');
  expect(panel.getAttribute('aria-label')).toBe('Install the package');
  expect(panel.classList.contains('setup__code')).toBe(true);
  expect(panel.classList.contains('code')).toBe(true);
});
