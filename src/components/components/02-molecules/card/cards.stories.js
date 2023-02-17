import card from './card.twig';

import cardData from './card.yml';
import cardBgData from './card-bg.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Molecules/Cards' };

export const cardExample = () => card(cardData);

export const cardWithBackground = () => card({ ...cardData, ...cardBgData });
