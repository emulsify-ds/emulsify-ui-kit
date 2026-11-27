import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './accordion.component.yml';
import docs from './accordion.docs.js';
import template from './accordion.twig';
import './accordion.js';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: { docs },
  args: {
    ...argsFromSchema(schema.props),
    ...widthControls.args,
    ...themeControls.args,
    accordion__bg_color: true,
  },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
  },
  render: renderTwig(({ width, theme, themeVariation, ...args }) =>
    template({
      ...args,
      accordion__width: width,
      accordion__theme: theme,
      accordion__theme__variation: themeVariation,
    }),
  ),
};

export const Accordion = {};

export const BulkControls = {
  args: {
    accordion__id: 'library-services-with-controls',
    accordion__show_controls: true,
  },
};
