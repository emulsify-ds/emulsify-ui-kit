import { renderTwig } from '@emulsify/core/storybook';

import tabsTwig from './tabs.twig';
import { mapDataToTwig } from '../../util/dataTransformers';
import './tabs';
import { props } from './tabs.component.yml';

const contextData = mapDataToTwig(props.properties);

export default {
  title: 'Components/Tabs',
  render: renderTwig(tabsTwig),
};

export const tabs = {
  args: contextData,
};
