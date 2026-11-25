import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import checkboxTwig from './checkbox/checkbox.twig';
import radioTwig from './radio/radio.twig';
import selectTwig from './select/select.twig';
import textfieldsTwig from './textfields/textfields.twig';

import formsData from './forms.yml';

const { properties } = formsData.props;

export default {
  title: 'Components/Forms',
  argTypes: {
    checkboxes: { control: 'object' },
    radios: { control: 'object' },
    select: { control: 'object' },
  },
};

export const checkboxes = {
  render: renderTwig(withStorybookPadding(checkboxTwig)),
  args: {
    checkboxes: properties.checkboxes.data,
  },
};

export const radioButtons = {
  render: renderTwig(withStorybookPadding(radioTwig)),
  args: {
    radios: properties.radios.data,
  },
};

export const selectDropdowns = {
  render: renderTwig(withStorybookPadding(selectTwig)),
  args: {
    select: properties.select.data,
  },
};

export const textfieldsExamples = {
  render: renderTwig(withStorybookPadding(textfieldsTwig)),
};
