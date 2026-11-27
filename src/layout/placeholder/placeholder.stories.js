import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import docs from './placeholder.docs.js';
import template from './placeholder.twig';
import schema from './placeholder.yml';

const width = createContainerWidthControls();
const theme = createContainerThemeControls();

export default {
  title: 'Layout/Placeholder',
  tags: ['autodocs'],
  parameters: { docs },
  args: { ...argsFromSchema(schema.props), ...width.args, ...theme.args },
  argTypes: { ...width.argTypes, ...theme.argTypes },
  render: renderTwig(withStorybookContainer(template)),
};

export const Placeholder = {};
