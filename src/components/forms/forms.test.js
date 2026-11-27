import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const parse = (path) => twig.twig({ data: read(path), rethrow: true });

twig.extendFilter('t', (value) => value);
const components = new Map(
  [
    '@components/forms/_form-element.twig',
    '@components/forms/_form-label.twig',
    '@components/forms/_input.twig',
    '@components/forms/checkbox/_checkbox-item.twig',
    '@components/forms/radio/_radio-item.twig',
    '@components/forms/select/_select-item.twig',
    '@components/cta/cta.twig',
  ].map((path) => [
    path,
    parse(
      path.replace('@components/forms/', './').replace('@components/', '../'),
    ),
  ]),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components.has(path)
      ? (props) => components.get(path).render(props)
      : undefined,
  ),
);

const forms = parse('./forms.twig');
const textfields = parse('./textfields/textfields.twig');
const select = parse('./select/select.twig');
const checkboxes = parse('./checkbox/checkbox.twig');
const radios = parse('./radio/radio.twig');

function render(fields, props = {}, formsProps = {}) {
  document.body.innerHTML = forms.render({
    forms__fields_content: fields.render(props),
    ...formsProps,
  });
  return document.querySelector('form');
}

test('renders one native form with the supplied Drupal attributes and classes', () => {
  const form = render(
    textfields,
    {},
    {
      forms__attributes: { id: 'workshop', method: 'post', class: 'custom' },
      forms__additional_classes: ['form-layout'],
    },
  );

  expect(document.querySelectorAll('form')).toHaveLength(1);
  expect(form.id).toBe('workshop');
  expect(form.method).toBe('post');
  expect([...form.classList]).toEqual(['forms', 'custom', 'form-layout']);
  expect(form.querySelector('button').type).toBe('submit');
});

test('connects labels, native required state, Drupal help, and inline errors', () => {
  const form = render(textfields);
  const email = form.querySelector('#forms-email');
  const references = email.getAttribute('aria-describedby').split(' ');

  expect(form.querySelector('legend').textContent).toBe(
    'Workshop registration',
  );
  expect(email.labels[0].textContent).toContain('Email address (required)');
  expect(email.required).toBe(true);
  expect(email.getAttribute('aria-invalid')).toBe('true');
  expect(email.closest('.form-item--error')).not.toBeNull();
  expect(references).toEqual([
    'forms-email--description',
    'forms-email--error',
  ]);
  expect(
    document
      .getElementById(references[0])
      .matches('.description.form-item__description'),
  ).toBe(true);
  expect(
    document.getElementById(references[1]).matches('.form-item--error-message'),
  ).toBe(true);
  expect(document.getElementById(references[1]).textContent).toContain(
    'Enter a complete email address',
  );
  expect(form.querySelector('#forms-notes').labels[0].textContent).toBe(
    'Access needs',
  );
});

test('keeps native options, labels, and control grouping', () => {
  const nativeSelect = render(select, {
    select: [
      { title: 'Choose', value: '' },
      { title: 'Library', value: 'library' },
    ],
  }).querySelector('select');
  expect(nativeSelect.labels[0].textContent).toBe('Workshop location');
  expect(nativeSelect.options[0].getAttribute('value')).toBe('');
  expect(nativeSelect.options[1].value).toBe('library');
  expect(
    document.getElementById(nativeSelect.getAttribute('aria-describedby')),
  ).not.toBeNull();

  const options = [
    { title: 'Morning', checked: 'checked' },
    { title: 'Evening', disabled: 'disabled' },
  ];
  for (const [component, props, type] of [
    [checkboxes, { checkboxes: options }, 'checkbox'],
    [radios, { radios: options }, 'radio'],
  ]) {
    const form = render(component, props);
    const [first, second] = form.querySelectorAll(`input[type="${type}"]`);
    expect(
      first.closest('fieldset').querySelector('legend').textContent,
    ).not.toBe('');
    expect(first.labels[0].textContent.trim()).toBe('Morning');
    expect(first.checked).toBe(true);
    expect(second.labels[0].textContent.trim()).toBe('Evening');
    expect(second.disabled).toBe(true);
  }
});
