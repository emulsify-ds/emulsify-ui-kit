import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import cardData from './card.component.yml';
import cardTwig from './card.twig';

const { properties } = cardData.props;

export default {
  title: 'Components/Card',
  render: renderTwig(withStorybookPadding(cardTwig)),
  argTypes: {
    card__image__src: {
      name: 'Image Source',
      control: 'text',
    },
    card__image__alt: {
      name: 'Image Alt Text',
      control: 'text',
    },
    card__heading: {
      name: 'Heading',
      control: 'text',
    },
    card__subheading: {
      name: 'Subheading',
      control: 'text',
    },
    card__body: {
      name: 'Body Text',
      control: 'text',
    },
    card__link__text: {
      name: 'Link Text',
      control: 'text',
    },
    card__link__url: {
      name: 'Link URL',
      control: 'text',
    },
    card__modifiers: {
      name: 'Modifiers',
      control: 'object',
    },
  },
};

export const CardVertical = {
  render: renderTwig(
    withStorybookPadding(cardTwig, { innerClass: 'sb-max-w-md' }),
  ),
  args: {
    card__image__src: properties.card__image__src.data,
    card__image__alt: properties.card__image__alt.data,
    card__heading: properties.card__heading.data,
    card__subheading: properties.card__subheading.data,
    card__body: properties.card__body.data,
    card__link__text: properties.card__link__text.data,
    card__link__url: properties.card__link__url.data,
    card__modifiers: [],
  },
};

export const cardHorizontal = {
  args: {
    card__image__src: 'https://placehold.co/250x200',
    card__image__alt: properties.card__image__alt.data,
    card__heading: properties.card__heading.data,
    card__subheading: properties.card__subheading.data,
    card__body: properties.card__body.data,
    card__link__text: properties.card__link__text.data,
    card__link__url: properties.card__link__url.data,
    card__modifiers: ['horizontal'],
  },
};
