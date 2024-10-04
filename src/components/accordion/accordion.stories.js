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
    width: {
      name: 'Container Width',
      control: { type: 'select' },
      options: {
        Small: 'compressed',
        Medium: 'standard',
      },
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Intro',
      type: 'string',
    },
    itemHeading: {
      name: 'Item Heading',
      type: 'string',
    },
    itemContent: {
      name: 'Item Content',
      type: 'string',
    },
  },
  args: {
    heading: accordionData.accordion__heading.data,
    text: accordionData.accordion__text.data,
    itemHeading: accordionData.accordion__item__heading.data,
    itemContent: accordionData.accordion__item__content.data,
  },
};

export const Accordion = ({ width, heading, text, itemHeading, itemContent }) =>
  accordionTwig({
    accordion__width: width,
    accordion__heading: heading,
    accordion__text: text,
    accordion__items: [
      {
        accordion__item__heading: itemHeading,
        accordion__item__content: itemContent,
      },
      {
        accordion__item__heading: itemHeading,
        accordion__item__content: itemContent,
      },
      {
        accordion__item__heading: itemHeading,
        accordion__item__content: itemContent,
      },
    ],
  });
