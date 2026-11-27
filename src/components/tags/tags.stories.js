import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './tags.component.yml';
import docs from './tags.docs.js';
import './tags.js';
import tagsTwig from './tags.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Tags',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(tagsTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: { ...themeControls.argTypes },
};

export const Tags = {};

export const ColorAccents = {
  args: {
    tags__items: [
      { title: 'Photography', color: 'primary', url: '/topics/photography' },
      { title: 'History', color: 'dark' },
      { title: 'Events', color: 'yellow', url: '/topics/events' },
      { title: 'Outdoors', color: 'green', url: '/topics/outdoors' },
      { title: 'Making', color: 'rebeccapurple', url: '/topics/making' },
    ],
  },
};
