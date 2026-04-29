// Twig templates
import tabsTwig from './tabs.twig';
// Utility
import { mapDataToTwig } from '../../util/dataTransformers';
import './tabs';
// Data
import { props } from './tabs.component.yml';
const tabData = mapDataToTwig(props.properties);

/**
 * Storybook Definition.
 */
export default { title: 'Components/Tabs' };

export const tabs = () => tabsTwig(tabData);
