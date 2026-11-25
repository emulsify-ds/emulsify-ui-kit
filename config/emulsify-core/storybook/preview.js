// The package export omits the leading `./` required by Vite.
import once from '../../../node_modules/@drupal/once/src/once.js';

window.once = once;

// export global parameters as config overrides.
// This is useful for reorganizing your stories.
// See https://storybook.js.org/docs/writing-stories/parameters#story-parameters.
export const overrideParams = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Docs',
        ['Intro', '*'],
        'Tokens',
        ['Readme', '*'],
        'Components',
        ['Readme', '*'],
        'Layout',
        ['Readme', '*'],
      ],
      locales: 'en-US',
    },
  },
};
