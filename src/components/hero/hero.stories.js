import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import '../video/video.js';
import schema from './hero.component.yml';
import docs from './hero.docs.js';
import template from './hero.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Hero',
  tags: ['autodocs'],
  parameters: { docs },
  args: {
    ...argsFromSchema(schema.props),
    ...widthControls.args,
    ...themeControls.args,
    width: 'wide',
  },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
    hero__media_type: {
      control: 'select',
      options: ['image', 'video', 'none'],
    },
    hero__media_alignment: { control: 'radio', options: ['left', 'right'] },
    hero__height: { control: 'radio', options: ['auto', 'tall'] },
  },
  render: ({ width, theme, themeVariation, ...args }, { viewMode } = {}) =>
    renderTwig(template, { wrapper: viewMode === 'docs' ? 'div' : 'main' })({
      ...args,
      hero__width: width,
      hero__theme: theme,
      hero__theme__variation: themeVariation,
    }),
};

export const Hero = {
  args: {
    hero__id: null,
    hero__image__src: 'assets/images/example/hero.jpg',
    hero__image__width: 1440,
    hero__image__height: 650,
  },
};

export const BackgroundVideo = {
  args: {
    hero__heading: 'A place to grow',
    hero__text: 'Visit the community garden and explore the seasonal displays.',
    hero__ctas: [{ content: 'Plan a garden visit', url: '/garden' }],
    hero__id: 'community-garden',
    hero__media_type: 'video',
    hero__media_alignment: 'left',
    hero__video__background: true,
    hero__video__poster: 'assets/images/example/hero.jpg',
    hero__video__sources: [
      {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        type: 'video/mp4',
      },
    ],
    hero__height: 'tall',
    themeVariation: 'dark',
  },
};

export const CopyOnly = {
  args: {
    hero__heading: 'Find your next project',
    hero__id: 'next-project',
    hero__media_type: 'none',
    width: 'narrow',
  },
};
