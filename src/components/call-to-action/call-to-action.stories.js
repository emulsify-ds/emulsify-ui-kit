// Twig templates
import callToActionTwig from './call-to-action.twig';
// Data files
import { props } from './call-to-action.component.yml';
const callToActionData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Call To Action',
  argTypes: {
    eyebrow: {
      name: 'Eyebrow',
      type: 'string',
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
    buttonContent: {
      name: 'Link Content (optional)',
      type: 'string',
    },
    theme: {
      name: 'Component Theme',
      control: { type: 'select' },
      options: {
        White: 'white-bg',
        LightBlue: 'light-blue-bg',
      },
    },
  },
  args: {
    theme: 'white-bg',
    eyebrow: 'Eyebrow here',
    heading: callToActionData.call_to_action__heading.data,
    text: callToActionData.call_to_action__text.data,
    buttonContent: callToActionData.call_to_action__button__text.data,
  },
};

export const callToAction = ({
  theme,
  eyebrow,
  heading,
  text,
  buttonContent,
}) =>
  callToActionTwig({
    call_to_action__theme: theme,
    call_to_action__overline: eyebrow,
    call_to_action__heading: heading,
    call_to_action__text: text,
    call_to_action__button__text: buttonContent,
    call_to_action__button__url:
      callToActionData.call_to_action__button__url.data,
  });
