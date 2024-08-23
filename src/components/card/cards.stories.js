import card from './card.twig';
import { props } from './card.component.yml';

const cardData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Cards',
};

export const cardVertical = () =>
  `<div style="max-width: 400px;">${card({
    card__image__src: cardData.card__image__src.data,
    card__image__alt: cardData.card__image__alt.data,
    card__image__output_image_tag: cardData.card__image__output_image_tag.data,
    card__heading: cardData.card__heading.data,
    card__subheading: cardData.card__subheading.data,
    card__body: cardData.card__body.data,
    card__link__text: cardData.card__link__text.data,
    card__link__url: cardData.card__link__url.data,
  })}</div>`;
export const cardHorizontal = () =>
  card({
    card__image__src: 'https://placehold.co/250x200',
    card__image__alt: cardData.card__image__alt.data,
    card__image__output_image_tag: cardData.card__image__output_image_tag.data,
    card__heading: cardData.card__heading.data,
    card__subheading: cardData.card__subheading.data,
    card__body: cardData.card__body.data,
    card__link__text: cardData.card__link__text.data,
    card__link__url: cardData.card__link__url.data,
    card__modifiers: ['horizontal'],
  });
