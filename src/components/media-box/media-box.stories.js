import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import '../video/video.js';
import schema from './media-box.component.yml';
import docs from './media-box.docs.js';
import mediaBoxTwig from './media-box.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();
const captions = encodeURIComponent(
  'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nA bee moves over a flower.\n',
);

export default {
  title: 'Components/Media Box',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(mediaBoxTwig),
  args: {
    ...argsFromSchema(schema.props),
    media_box__width: 'narrow',
    media_box__theme: themeControls.args.theme,
    media_box__theme__variation: themeControls.args.themeVariation,
    media_box__bg_color: true,
    media_box__image__width: 847,
    media_box__image__height: 451,
    media_box__image__caption: 'A camera set up for a location shoot.',
  },
  argTypes: {
    media_box__type: { control: 'select', options: ['image', 'video'] },
    media_box__width: widthControls.argTypes.width,
    media_box__theme: themeControls.argTypes.theme,
    media_box__theme__variation: themeControls.argTypes.themeVariation,
  },
};

export const MediaBox = {};

export const Video = {
  args: {
    media_box__type: 'video',
    media_box__heading: 'A closer look at pollinators',
    media_box__text: 'Watch how a bee moves from petal to petal.',
    media_box__video__title: 'A bee on a flower',
    media_box__video__sources: [
      {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        type: 'video/mp4',
      },
    ],
    media_box__video__tracks: [
      {
        src: `data:text/vtt,${captions}`,
        kind: 'captions',
        srclang: 'en',
        label: 'English',
        default: true,
      },
    ],
    media_box__theme__variation: 'dark',
  },
};
