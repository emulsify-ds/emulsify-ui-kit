import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './embed.component.yml';
import docs from './embed.docs.js';
import template from './embed.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Embed',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(template),
  args: {
    ...argsFromSchema(schema.props),
    embed__theme: themeControls.args.theme,
    embed__theme__variation: themeControls.args.themeVariation,
  },
  argTypes: {
    embed__width: widthControls.argTypes.width,
    embed__theme: themeControls.argTypes.theme,
    embed__theme__variation: themeControls.argTypes.themeVariation,
    embed__ratio: {
      control: 'select',
      options: ['16-9', '4-3', '1-1', 'custom'],
    },
    embed__ratio_custom: {
      control: 'text',
      if: { arg: 'embed__ratio', eq: 'custom' },
    },
  },
};

export const Embed = {};

export const Map = {
  args: {
    embed__heading: 'Find the library',
    embed__title: 'Map of the library neighborhood',
    embed__text: null,
    embed__caption: 'The entrance faces the main street.',
    embed__src:
      'https://www.openstreetmap.org/export/embed.html?bbox=-0.133%2C51.517%2C-0.121%2C51.524&layer=mapnik',
    embed__ratio: '4-3',
  },
};
