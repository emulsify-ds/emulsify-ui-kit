import { fileURLToPath } from 'node:url';

export default {
  addons: ['@storybook/addon-docs'],
};

const sourcePath = fileURLToPath(
  new URL('../../../src/', import.meta.url),
).replaceAll('\\', '/');
const orderedRoots = [
  'base/',
  'foundation/',
  'tokens/',
  'layout/',
  'components/',
  'storybook/',
];

function storyRootOrder(glob) {
  const index = orderedRoots.findIndex(
    (directory) =>
      typeof glob === 'string' && glob.startsWith(`${sourcePath}${directory}`),
  );
  return index === -1 ? orderedRoots.length : index;
}

export function extendConfig(config) {
  return {
    ...config,
    stories: [
      // Welcome and guides are MDX pages. Example stories come last.
      `${sourcePath}storybook/**/*.mdx`,
      ...config.stories.toSorted(
        (a, b) => storyRootOrder(a) - storyRootOrder(b),
      ),
    ],
  };
}
