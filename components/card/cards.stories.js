import card from './card.twig';
import cardData from './card.yml';
import cardDataHorizontal from './card-horizontal.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Cards',
};

export const cardVertical = () =>
  `<div style="max-width: 400px;">${card(cardData)}</div>`;
export const cardHorizontal = () => card(cardDataHorizontal);
