import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './link-group.component.yml';
import docs from './link-group.docs.js';
import template from './link-group.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Link Group',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(template),
  args: {
    ...argsFromSchema(schema.props),
    link_group__width: widthControls.args.width,
    link_group__theme: themeControls.args.theme,
    link_group__theme__variation: themeControls.args.themeVariation,
    link_group__bg_color: true,
  },
  argTypes: {
    link_group__width: widthControls.argTypes.width,
    link_group__theme: themeControls.argTypes.theme,
    link_group__theme__variation: themeControls.argTypes.themeVariation,
    link_group__display: {
      control: 'select',
      options: ['button', 'boxes'],
    },
  },
};

export const LinkGroup = {};

export const Boxes = {
  args: {
    link_group__display: 'boxes',
    link_group__width: 'wide',
    link_group__nav_label: 'Library resources',
  },
};
