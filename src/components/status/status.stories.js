import { renderTwig } from '@emulsify/core/storybook';

import statusTwig from './status.twig';
import { props } from './status.component.yml';
import { mapDataToTwig } from '../../util/dataTransformers';

const statusData = mapDataToTwig(props.properties);

export default {
  title: 'Components/Status',
  render: renderTwig(statusTwig),
};

export const statusExamples = {
  args: {
    ...statusData,
  },
};
