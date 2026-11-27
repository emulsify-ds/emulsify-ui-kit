import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/stats-group/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const parseTemplate = (path, id) =>
  twig.twig({
    id,
    data: readFileSync(new URL(path, sourceDirectory), 'utf8'),
    allowInlineIncludes: true,
    rethrow: true,
  });

twig.extendFilter('t', (message) => message);
parseTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const grid = parseTemplate('../../layout/grid/grid.twig');
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    path === '@layout/grid/grid.twig'
      ? (props) => grid.render(props)
      : undefined,
  ),
);
const template = parseTemplate('./stats-group.twig');

function renderGroup(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('pairs each metric with its label and preserves zero', () => {
  const section = renderGroup({
    stats_group__heading: 'Library activity',
    stats_group__heading_level: 3,
    stats_group__grid_columns: 2,
    stats_group__items: [
      { metric: '96%', description: 'Satisfaction' },
      { metric: 0, description: 'Waitlisted participants' },
      { metric: '36' },
      { description: 'Unreported metric' },
    ],
  });

  expect(section.querySelector('h3').textContent).toBe('Library activity');
  expect(section.querySelectorAll('h2, h4, h5, h6')).toHaveLength(0);
  expect(section.querySelector('.grid').dataset.gridColumns).toBe('2');
  expect(
    [...section.querySelectorAll('.grid__inner > dl')].map((list) =>
      [...list.children].map((child) => [child.tagName, child.textContent]),
    ),
  ).toEqual([
    [
      ['DT', 'Satisfaction'],
      ['DD', '96%'],
    ],
    [
      ['DT', 'Waitlisted participants'],
      ['DD', '0'],
    ],
  ]);
});

test('forwards all shared section props and leaves motion off by default', () => {
  const section = renderGroup({
    stats_group__id: 'activity',
    stats_group__width: 'wide',
    stats_group__alignment: 'right',
    stats_group__theme: 'default',
    stats_group__theme__variation: 'dark',
    stats_group__bg_color: true,
    stats_group__spacing: 'four',
    stats_group__container__modifiers: ['quiet'],
  });

  expect(section.id).toBe('section-activity');
  expect(section.matches('.container--quiet')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'wide',
    componentAlignment: 'right',
    componentTheme: 'default dark',
    componentBg: 'true',
    componentSpacing: 'four',
  });
  expect(section.querySelector('.stats-group').dataset.statsGroupAnimate).toBe(
    'false',
  );
});

test('accepts a custom statistic and applies entrance motion only by opt-in', () => {
  const section = renderGroup({
    stats_group__animate: true,
    stats_group__items: [{ metric: 12, description: 'Workshops' }],
    stats_group__items_content: '<dl><dt>Visitors</dt><dd>400</dd></dl>',
  });

  expect(section.querySelector('.grid__inner > dl dd').textContent).toBe('400');
  expect(section.querySelector('.stats-group').dataset.statsGroupAnimate).toBe(
    'true',
  );
});
