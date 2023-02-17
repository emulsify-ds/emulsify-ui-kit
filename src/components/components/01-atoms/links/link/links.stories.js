import link from './link.twig';

import linkData from './link.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Atoms/Links' };

export const links = () => link(linkData);
