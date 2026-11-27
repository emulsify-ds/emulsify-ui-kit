import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './text-with-image.component.yml';
import docs from './text-with-image.docs.js';
import textWithImageTwig from './text-with-image.twig';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Components/Text with Image',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(textWithImageTwig),
  args: {
    ...argsFromSchema(schema.props),
    text_with_image__theme: themeControls.args.theme,
    text_with_image__theme__variation: themeControls.args.themeVariation,
    text_with_image__bg_color: true,
    text_with_image__ctas: [
      { content: 'View workshop dates', url: '/workshops/dates' },
      { content: 'Read the equipment guide', url: '/workshops/equipment' },
    ],
  },
  argTypes: {
    text_with_image__text: { control: 'text' },
    text_with_image__width: widthControls.argTypes.width,
    text_with_image__theme: themeControls.argTypes.theme,
    text_with_image__theme__variation: themeControls.argTypes.themeVariation,
    text_with_image__media_alignment: {
      control: 'select',
      options: ['left', 'right'],
      table: { category: 'Appearance' },
    },
    text_with_image__focus: {
      control: 'select',
      options: ['equal', 'image', 'text'],
      table: { category: 'Appearance' },
    },
  },
};

export const TextWithImage = {};

export const ImageRight = {
  args: {
    text_with_image__media_alignment: 'right',
    text_with_image__focus: 'image',
    text_with_image__image__caption: 'A camera set up for a location shoot.',
    text_with_image__theme__variation: 'dark',
  },
};
