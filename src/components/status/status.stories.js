import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './status.component.yml';
import docs from './status.docs.js';
import template from './status.twig';
import './status.js';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Status',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(template)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: themeControls.argTypes,
};

export const StatusExamples = {};

export const Dismissible = {
  args: {
    status__dismissible: true,
    status__messages: {
      success: ['Your workshop reservation is confirmed.'],
      info: ['Bring your library card to check in.'],
    },
  },
};
