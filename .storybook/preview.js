import { addDecorator } from '@storybook/html';
import { useEffect } from '@storybook/client-api';
import Twig from 'twig';
import { setupTwig } from './setupTwig';
import { withDesign } from 'storybook-addon-designs';

// GLOBAL CSS
import '../src/fonts/fonts.scss';
import '../src/style.scss';

// If in a Drupal project, it's recommended to import a symlinked version of drupal.js.
import './_drupal.js';

// addDecorator deprecated, but not sure how to use this otherwise.
addDecorator((storyFn) => {
  useEffect(() => Drupal.attachBehaviors(), []);
  return storyFn();
});

setupTwig(Twig);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Docs',
        'Pages',
        'Layouts',
        'Regions',
        'Components',
        'Tokens',
        '*',
        'WIP',
      ],
      includeNames: true,
    },
  },
};
