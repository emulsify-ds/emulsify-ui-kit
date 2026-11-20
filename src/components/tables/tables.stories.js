import { renderTwig } from '@emulsify/core/storybook';
import tableTwig from './tables.twig';
import { props } from './tables.component.yml';
import { mapDataToTwig } from '../../util/dataTransformers';

const tableData = mapDataToTwig(props.properties);

export default {
  title: 'Components/Typography',
  render: renderTwig(tableTwig),
};

export const tables = {
  args: tableData,
};
