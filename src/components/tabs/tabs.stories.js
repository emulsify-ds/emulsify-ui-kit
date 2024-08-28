import tabsTwig from './tabs.twig';

import { props } from './tabs.component.yml';

import './tabs';
import { mapDataToTwig } from '../../util/dataTransformers';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Tabs' };

const tabData = mapDataToTwig(props.properties);

export const tabs = () => tabsTwig(tabData);
