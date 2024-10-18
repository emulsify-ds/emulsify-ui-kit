// Twig templates
import textFieldTwig from './text.twig';

// Data files
import { props } from './text.component.yml';
const textData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Text',
};

export const Text = () =>
  textFieldTwig({
    text__content: textData.text__content.data,
  });
