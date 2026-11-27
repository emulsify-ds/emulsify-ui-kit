import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './audio-player.component.yml';
import docs from './audio-player.docs.js';
import template from './audio-player.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Audio Player',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(template)),
  args: { ...argsFromSchema(schema.props), ...themeControls.args },
  argTypes: themeControls.argTypes,
};

export const AudioPlayer = {};

export const WithTranscript = {
  args: { audio_player__transcript_url: '#ball-transcript' },
  render: renderTwig(
    withStorybookContainer(
      (args) =>
        `${template(args)}<p id="ball-transcript">Sound of a bouncing ball.</p>`,
    ),
  ),
};
