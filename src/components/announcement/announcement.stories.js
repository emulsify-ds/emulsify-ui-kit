import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './announcement.component.yml';
import docs from './announcement.docs.js';
import template from './announcement.twig';
import './announcement.js';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Announcement',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(template)),
  args: {
    ...argsFromSchema(schema.props),
    ...widthControls.args,
    ...themeControls.args,
  },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
    announcement__variant: {
      control: 'select',
      options: ['default', 'tint'],
    },
  },
};

export const Basic = {};

export const Light = {
  args: { announcement__variant: 'tint' },
};

export const Dark = {
  args: { announcement__variant: 'tint', themeVariation: 'dark' },
};

export const NoIcon = {
  args: { announcement__icon: null },
};

export const Dismissible = {
  args: {
    announcement__dismissible: true,
    announcement__ctas: [
      { content: 'Check opening hours', url: '/library/hours' },
      { content: 'Contact the library', url: '/library/contact' },
    ],
  },
};
