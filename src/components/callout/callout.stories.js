import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './callout.component.yml';
import docs from './callout.docs.js';
import template from './callout.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Callout',
  tags: ['autodocs'],
  parameters: { docs },
  args: {
    ...argsFromSchema(schema.props),
    ...widthControls.args,
    ...themeControls.args,
    callout__bg_color: true,
  },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
  },
  render: renderTwig(({ width, theme, themeVariation, ...args }) =>
    template({
      ...args,
      callout__width: width,
      callout__theme: theme,
      callout__theme__variation: themeVariation,
    }),
  ),
};

export const Callout = {};

export const SingleAction = {
  args: {
    callout__ctas: [{ content: 'Find a workshop', url: '/workshops' }],
  },
};
