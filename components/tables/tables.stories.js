import tableTwig from './tables.twig';
import tableData from './tables.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography' };

export const tables = () => tableTwig(tableData);
