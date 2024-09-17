import tableTwig from './tables.twig';
import { props } from './tables.component.yml';
import { mapDataToTwig } from '../../util/dataTransformers';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography' };

const tableData = mapDataToTwig(props.properties);

export const tables = () => tableTwig(tableData);
