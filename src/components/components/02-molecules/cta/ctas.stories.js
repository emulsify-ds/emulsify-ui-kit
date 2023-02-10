import cta from './cta.twig';

import ctaData from './cta.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Molecules/CTA' };

export const ctaExample = () => cta(ctaData);
