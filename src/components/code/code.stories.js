import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './code.component.yml';
import docs from './code.docs.js';
import template from './code.twig';

const theme = createContainerThemeControls();

export default {
  title: 'Components/Code',
  tags: ['autodocs'],
  render: renderTwig(withStorybookContainer(template)),
  parameters: { docs },
  argTypes: {
    ...theme.argTypes,
    code__content: { name: 'Source text', control: 'text' },
  },
  args: { ...argsFromSchema(schema.props), ...theme.args },
};

export const Code = {};
