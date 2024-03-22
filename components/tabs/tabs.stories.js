import tabsTwig from './tabs.twig';

import tabData from './tabs.yml';

import './tabs';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Tabs' };

export const tabs = () => tabsTwig(tabData);
