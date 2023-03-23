import tableTwig from './tables.twig';
import tableData from './tables.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Tables' };

export const tables = () => tableTwig(tableData);
