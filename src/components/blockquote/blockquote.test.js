import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const template = twig.twig({
  data: readFileSync(new URL('./blockquote.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderBlockquote(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders one semantic quote with its attribution outside the quotation', () => {
  const figure = renderBlockquote({
    blockquote__quote: '<p>Leave enough room for an idea to grow.</p>',
    blockquote__attribution: 'Workshop facilitator',
    blockquote__attribution_secondary: 'Opening remarks',
    blockquote__style: 'bar-right',
    blockquote__blockname: 'report',
    blockquote__attributes: { id: 'quotation' },
  });

  expect(figure.tagName).toBe('FIGURE');
  expect([...figure.classList]).toEqual(['report__blockquote', 'blockquote']);
  expect(figure.id).toBe('quotation');
  expect(figure.dataset.blockquoteStyle).toBe('bar-right');
  expect(figure.querySelectorAll('blockquote')).toHaveLength(1);
  expect(figure.querySelector('blockquote p').textContent).toBe(
    'Leave enough room for an idea to grow.',
  );
  expect(figure.querySelector('blockquote figcaption')).toBeNull();
  expect(
    figure.querySelector('figcaption .blockquote__attribution').textContent,
  ).toBe('Workshop facilitator');
  expect(
    figure.querySelector('figcaption .blockquote__attribution-secondary')
      .textContent,
  ).toBe('Opening remarks');
});

test('omits an empty caption and uses the default accent for an invalid style', () => {
  const figure = renderBlockquote({
    blockquote__quote: 'Keep close to the original wording.',
    blockquote__style: 'unknown',
  });

  expect(figure.querySelector('figcaption')).toBeNull();
  expect(figure.dataset.blockquoteStyle).toBe('bar-left');
});

test('uses separate quote and attribution content slots', () => {
  const figure = renderBlockquote({
    blockquote__quote: 'Fallback quote',
    blockquote__quote_content: '<p>Rendered quotation</p>',
    blockquote__attribution: 'Fallback source',
    blockquote__attribution_content: '<cite>Rendered source</cite>',
  });

  expect(figure.querySelector('blockquote p').textContent).toBe(
    'Rendered quotation',
  );
  expect(figure.querySelector('figcaption cite').textContent).toBe(
    'Rendered source',
  );
});
