import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './tabs.component.yml';
import docs from './tabs.docs.js';
import tabsTwig from './tabs.twig';
import './tabs.js';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: { docs },
  render: (args, { viewMode } = {}) =>
    renderTwig(tabsTwig, {
      wrapper: viewMode === 'docs' ? 'div' : 'main',
    })(args),
  args: {
    ...argsFromSchema(schema.props),
    tabs__theme: themeControls.args.theme,
    tabs__theme__variation: themeControls.args.themeVariation,
    tabs__bg_color: true,
  },
  argTypes: {
    tabs__theme: themeControls.argTypes.theme,
    tabs__theme__variation: themeControls.argTypes.themeVariation,
    tabs__width: widthControls.argTypes.width,
  },
};

export const Tabs = {};

export const Narrow = {
  args: {
    tabs__id: 'library-visit-narrow',
    tabs__width: 'narrow',
    tabs__heading: null,
    tabs__active: 'access',
  },
};
