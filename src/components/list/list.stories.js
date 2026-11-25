import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './list.component.yml';
import docs from './list.docs.js';
import list from './list.twig';

const theme = createContainerThemeControls();

export default {
  title: 'Components/List',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(list)),
  args: { ...argsFromSchema(schema.props), ...theme.args },
  argTypes: {
    ...theme.argTypes,
    list__type: { control: 'select', options: ['ul', 'ol'] },
    list__modifiers: { control: 'check', options: ['plain', 'inline'] },
  },
};

export const Unordered = {};

export const Ordered = { args: { list__type: 'ol' } };

export const Inline = {
  args: {
    list__items: ['Overview', 'Details', 'Contact'],
    list__modifiers: ['inline'],
  },
};
