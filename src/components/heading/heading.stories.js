import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './heading.component.yml';
import docs from './heading.docs.js';
import headingTwig from './heading.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Heading',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(headingTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    heading__url: null,
  },
  argTypes: {
    ...themeControls.argTypes,
    heading__level: {
      control: 'select',
      options: schema.props.properties.heading__level.enum.filter(Boolean),
    },
    heading__modifiers: {
      control: 'check',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'display'],
      table: { category: 'Appearance' },
    },
  },
};

export const Heading = {};

export const Display = {
  args: {
    heading__content: 'Explore the library',
    heading__level: 2,
    heading__modifiers: ['display'],
  },
};

export const Linked = {
  args: {
    heading__content: 'Browse components',
    heading__level: 2,
    heading__url: '#components',
  },
};
