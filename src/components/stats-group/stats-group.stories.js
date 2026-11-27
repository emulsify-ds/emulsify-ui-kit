import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './stats-group.component.yml';
import docs from './stats-group.docs.js';
import template from './stats-group.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Stats Group',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(template),
  args: {
    ...argsFromSchema(schema.props),
    stats_group__width: 'wide',
    stats_group__theme: themeControls.args.theme,
    stats_group__theme__variation: themeControls.args.themeVariation,
    stats_group__bg_color: true,
  },
  argTypes: {
    stats_group__width: widthControls.argTypes.width,
    stats_group__theme: themeControls.argTypes.theme,
    stats_group__theme__variation: themeControls.argTypes.themeVariation,
    stats_group__grid_columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
  },
};

export const StatsGroup = {};

export const Dark = {
  args: { stats_group__theme__variation: 'dark' },
};
