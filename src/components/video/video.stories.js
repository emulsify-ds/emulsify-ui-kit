import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './video.component.yml';
import docs from './video.docs.js';
import './video.js';
import videoTwig from './video.twig';

const themeControls = createContainerThemeControls();
const html5Sources = [
  {
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    type: 'video/mp4',
  },
];
const captions = encodeURIComponent(
  'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nA bee moves over a flower.\n',
);

export default {
  title: 'Components/Video',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(videoTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: {
    ...themeControls.argTypes,
    video__type: { control: 'select', options: ['html5', 'embed'] },
    video__aspect_ratio: { control: 'select', options: ['16:9', '4:3', '1:1'] },
  },
};

export const VideoHtml5 = {
  args: {
    video__title: 'Bee on a flower',
    video__sources: html5Sources,
    video__tracks: [
      {
        src: `data:text/vtt,${captions}`,
        kind: 'captions',
        srclang: 'en',
        label: 'English',
        default: true,
      },
    ],
    video__poster: 'assets/images/example/basic-camera-image.png',
    video__caption: 'A short video of a bee on a flower.',
  },
};

export const VideoEmbed = {
  args: {
    video__type: 'embed',
    video__title: 'Component-Based Theming in Drupal',
    video__embed_url: 'https://www.youtube-nocookie.com/embed/YRnVnlhjOBs',
  },
};
