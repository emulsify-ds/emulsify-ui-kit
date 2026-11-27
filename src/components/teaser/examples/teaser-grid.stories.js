import { renderTwig } from '@emulsify/core/storybook';

import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../../util/storybookContainerControls.js';
import teaserGridTwig from './_teaser-grid.twig';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Examples/Teaser grid',
  parameters: { layout: 'fullscreen' },
  render: renderTwig(teaserGridTwig),
  args: {
    ...themeControls.args,
    ...widthControls.args,
    width: 'wide',
    columns: 3,
  },
  argTypes: {
    ...themeControls.argTypes,
    ...widthControls.argTypes,
  },
};

export const Workshops = {
  args: {
    heading: 'Upcoming workshops',
    teasers: [
      {
        teaser__heading: 'Film photography basics',
        teaser__overline: 'Workshop',
        teaser__url: '/workshops/film-photography',
        teaser__content:
          'Learn to load film, set exposure, and compose a shot.',
        teaser__image__src: 'assets/images/example/basic-camera-image.png',
        teaser__image__alt: 'A film camera on a tripod',
        teaser__meta: [{ label: 'Duration', value: '90 minutes' }],
        teaser__style: 'card',
        teaser__ctas: [
          { content: 'See workshop details', icon: 'arrow-right' },
        ],
      },
      {
        teaser__heading: 'Write a short story',
        teaser__overline: 'Workshop',
        teaser__url: '/workshops/short-stories',
        teaser__content: 'Turn an everyday observation into a short story.',
        teaser__meta: [{ label: 'Duration', value: '60 minutes' }],
        teaser__style: 'card',
        teaser__ctas: [
          { content: 'See workshop details', icon: 'arrow-right' },
        ],
      },
      {
        teaser__heading: 'Draw with ink',
        teaser__overline: 'Workshop',
        teaser__url: '/workshops/ink-drawing',
        teaser__content: 'Practice mark making with a pen and brush.',
        teaser__meta: [{ label: 'Duration', value: '90 minutes' }],
        teaser__style: 'card',
        teaser__ctas: [
          { content: 'See workshop details', icon: 'arrow-right' },
        ],
      },
    ],
  },
};

export const Resources = {
  args: {
    heading: 'Resources for new volunteers',
    themeVariation: 'dark',
    columns: 2,
    teasers: [
      {
        teaser__heading: 'Plan your first shift',
        teaser__url: '/volunteer/first-shift',
        teaser__content:
          'Review what to bring and where to meet your shift leader.',
        teaser__style: 'postcard',
      },
      {
        teaser__heading: 'Explore training resources',
        teaser__url: '/volunteer/training',
        teaser__content: 'Find the training materials for your volunteer role.',
        teaser__style: 'postcard',
      },
    ],
  },
};
