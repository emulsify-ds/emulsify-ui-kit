import { renderTwig } from '@emulsify/core/storybook';
import accordionData from './accordion.component.yml';
import accordionTwig from './accordion.twig';
import './accordion';

export default {
  title: 'Components/Accordion',
  render: renderTwig(accordionTwig),
  argTypes: {
    accordion__heading: {
      name: 'Heading',
      control: 'text',
    },
    accordion__text: {
      name: 'Intro Text',
      control: 'text',
    },
    accordion__items: {
      table: {
        disable: true,
      },
    },
  },
};

const { properties } = accordionData.props;

export const accordion = {
  args: {
    accordion__heading: properties.accordion__heading.data,
    accordion__text: properties.accordion__text.data,
    accordion__items: properties.accordion__items.data,
  },
};
