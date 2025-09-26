import checkbox from './checkbox/checkbox.twig';
import radio from './radio/radio.twig';
import select from './select/select.twig';
import textfields from './textfields/textfields.twig';

import { props } from './forms.yml';

const checkboxData = props.properties.checkboxes.data;
const radioData = props.properties.radios.data;
const selectOptionsData = props.properties.select.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Forms' };

export const checkboxes = () => checkbox({ checkboxes: checkboxData });

export const radioButtons = () => radio({ radios: radioData });

export const selectDropdowns = () => select({ select: selectOptionsData });

export const textfieldsExamples = () => textfields();
