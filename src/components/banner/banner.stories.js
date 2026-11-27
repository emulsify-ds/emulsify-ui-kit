import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import '../video/video.js';
import schema from './banner.component.yml';
import docs from './banner.docs.js';
import template from './banner.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();
const captions = encodeURIComponent(
  'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nA bee moves across a flower.\n',
);

export default {
  title: 'Components/Banner',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(template),
  args: {
    ...argsFromSchema(schema.props),
    banner__theme: themeControls.args.theme,
    banner__theme__variation: themeControls.args.themeVariation,
    banner__image__src: 'assets/images/example/basic-camera-image.png',
    banner__image__alt: 'A film camera on a tripod',
    banner__image__width: 847,
    banner__image__height: 451,
  },
  argTypes: {
    banner__width: widthControls.argTypes.width,
    banner__theme: themeControls.argTypes.theme,
    banner__theme__variation: themeControls.argTypes.themeVariation,
  },
};

export const Banner = {};

export const Video = {
  args: {
    banner__overline: 'From the garden',
    banner__heading: 'Watch pollinators up close',
    banner__text: 'See how a bee moves across a flower.',
    banner__theme__variation: 'dark',
    banner__media_alignment: 'left',
    banner__image__src: null,
    banner__video__title: 'A bee on a flower',
    banner__video__sources: [
      {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        type: 'video/mp4',
      },
    ],
    banner__video__tracks: [
      {
        src: `data:text/vtt,${captions}`,
        kind: 'captions',
        srclang: 'en',
        label: 'English',
      },
    ],
    banner__ctas: [
      { content: 'Plan a visit', url: '/visit' },
      { content: 'Find garden resources', url: '/garden-resources' },
    ],
  },
};

export const CopyOnly = {
  args: {
    banner__image__src: null,
    banner__alignment: 'center',
    banner__width: 'narrow',
  },
};
