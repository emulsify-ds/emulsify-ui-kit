import status from './status.twig';
import { props } from './status.component.yml';
import { mapDataToTwig } from '../../util/dataTransformers';

const statusData = mapDataToTwig(props.properties);

/**
 * Storybook Definition.
 */
export default { title: 'Components/Status' };

export const statusExamples = () => status(statusData);
