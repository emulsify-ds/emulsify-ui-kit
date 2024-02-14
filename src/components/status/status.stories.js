import status from './status.twig';

import statusData from './status.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Status' };

export const statusExamples = () => status(statusData);
