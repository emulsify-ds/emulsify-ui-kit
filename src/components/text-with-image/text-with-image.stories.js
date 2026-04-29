// Twig templates
import textWithImageTwig from './text-with-image.twig';
// Data files
import { props } from './text-with-image.component.yml';
const textWithImageData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Text With Image',
  argTypes: {
    position: {
      name: 'Image Position',
      control: { type: 'select' },
      options: {
        Left: 'left',
        Right: 'right',
      },
    },
    focus: {
      name: 'Component Focus',
      control: { type: 'select' },
      options: {
        Equal: 'equal',
        Image: 'image',
        Text: 'text',
      },
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
    linkContent: {
      name: 'Link Content (optional)',
      type: 'string',
    },
  },
  args: {
    position: 'left',
    focus: 'equal',
    heading: textWithImageData.text_with_image__heading.data,
    text: textWithImageData.text_with_image__text.data,
    linkContent: textWithImageData.text_with_image__link__content.data,
  },
};

export const TextWithImage = ({
  position,
  focus,
  heading,
  text,
  linkContent,
}) =>
  textWithImageTwig({
    text_with_image__position: position,
    text_with_image__focus: focus,
    text_with_image__heading: heading,
    text_with_image__text: text,
    text_with_image__link__content: linkContent,
    text_with_image__link__url:
      textWithImageData.text_with_image__link__url.data,
  });
