import { renderTwig } from '@emulsify/core/storybook';

import textWithImageTwig from './text-with-image.twig';
import { props } from './text-with-image.component.yml';

const textWithImageData = props.properties;

export default {
  title: 'Components/Text With Image',
  render: renderTwig(textWithImageTwig),
  argTypes: {
    text_with_image__position: {
      name: 'Image Position',
      control: 'select',
      options: ['left', 'right'],
    },
    text_with_image__focus: {
      name: 'Component Focus',
      control: 'select',
      options: ['equal', 'image', 'text'],
    },
    text_with_image__heading: {
      name: 'Heading',
      control: 'text',
    },
    text_with_image__text: {
      name: 'Text',
      control: 'text',
    },
    text_with_image__link__content: {
      name: 'Link Content (optional)',
      control: 'text',
    },
    text_with_image__link__url: {
      name: 'Link URL',
      control: 'text',
    },
  },
};

export const textWithImage = {
  args: {
    text_with_image__position: 'left',
    text_with_image__focus: 'equal',
    text_with_image__heading: textWithImageData.text_with_image__heading.data,
    text_with_image__text: textWithImageData.text_with_image__text.data,
    text_with_image__link__content:
      textWithImageData.text_with_image__link__content.data,
    text_with_image__link__url:
      textWithImageData.text_with_image__link__url.data,
  },
};
