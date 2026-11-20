import { renderTwig } from '@emulsify/core/storybook';

import callToActionTwig from './call-to-action.twig';
import callToActionData from './call-to-action.component.yml';

const { properties } = callToActionData.props;

export default {
  title: 'Components/Call To Action',
  render: renderTwig(callToActionTwig),
  argTypes: {
    call_to_action__theme: {
      name: 'Component Theme',
      control: 'select',
      options: properties.call_to_action__theme?.enum || [
        'white-bg',
        'light-blue-bg',
      ],
    },
    call_to_action__overline: {
      name: 'Eyebrow',
      control: 'text',
    },
    call_to_action__heading: {
      name: 'Heading',
      control: 'text',
    },
    call_to_action__text: {
      name: 'Text',
      control: 'text',
    },
    call_to_action__button__text: {
      name: 'Link Content (optional)',
      control: 'text',
    },
    call_to_action__button__url: {
      name: 'Link URL',
      control: 'text',
    },
  },
};

export const callToAction = {
  args: {
    call_to_action__theme: 'white-bg',
    call_to_action__overline: 'Eyebrow here',
    call_to_action__heading: properties.call_to_action__heading.data,
    call_to_action__text: properties.call_to_action__text.data,
    call_to_action__button__text: properties.call_to_action__button__text.data,
    call_to_action__button__url: properties.call_to_action__button__url.data,
  },
};
