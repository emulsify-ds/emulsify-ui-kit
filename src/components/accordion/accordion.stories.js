import accordionTwig from './accordion.twig';

import { props } from './accordion.component.yml';

import './accordion';

const accordionData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Accordion',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: accordionData.accordion__item__heading.data,
    },
    content: {
      name: 'Content',
      type: 'string',
      defaultValue: accordionData.accordion__item__content.data,
    },
  },
  decorators: [
    (story) =>
      `<div style="max-width: 890px; margin: 0 auto;">${story()}</div>`,
  ],
};

export const Accordion = ({ heading, content }) =>
  accordionTwig({
    accordion__items: [
      {
        accordion__item__heading: heading,
        accordion__item__content: content,
      },
      {
        accordion__item__heading: accordionData.accordion__item__heading.data,
        accordion__item__content: accordionData.accordion__item__content.data,
      },
      {
        accordion__item__heading: accordionData.accordion__item__heading.data,
        accordion__item__content: accordionData.accordion__item__content.data,
      },
    ],
  });
