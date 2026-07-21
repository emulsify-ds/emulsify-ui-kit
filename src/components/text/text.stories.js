import { renderTwig } from '@emulsify/core/storybook';

import textFieldTwig from './text.twig';
import { props } from './text.component.yml';

const textData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Text',
  render: renderTwig(textFieldTwig),
  argTypes: {
    text__content: {
      name: 'Content',
      control: 'text',
    },
  },
};

export const text = {
  args: {
    text__content: textData.text__content.data,
  },
};
