import accordionTwig from './accordion.twig';

import accordionData from './accordion.yml';

import './accordion';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Accordion',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: accordionData.accordion__item__heading,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: accordionData.accordion__item__content,
    },
  },
};

export const Accordion = ({ heading, content }) =>
  accordionTwig({
    accordion__items: [
      {
        accordion__item__heading: heading,
        accordion__item__content: content,
      },
      {
        accordion__item__heading: accordionData.accordion__item__heading,
        accordion__item__content: accordionData.accordion__item__content,
      },
      {
        accordion__item__heading: accordionData.accordion__item__heading,
        accordion__item__content: accordionData.accordion__item__content,
      },
    ],
  });
