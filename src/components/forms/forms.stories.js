import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';

import docs from './forms.docs.js';
import formsTwig from './forms.twig';
import checkboxTwig from './checkbox/checkbox.twig';
import radioTwig from './radio/radio.twig';
import selectTwig from './select/select.twig';
import textfieldsTwig from './textfields/textfields.twig';

const themeControls = createContainerThemeControls();

const renderForm =
  (fields) =>
  (args, { viewMode } = {}) =>
    renderTwig(
      withStorybookContainer((formArgs) =>
        formsTwig({
          ...formArgs,
          forms__attributes: { method: 'post' },
          forms__fields_content: fields(formArgs),
        }),
      ),
      { wrapper: viewMode === 'docs' ? 'div' : 'main' },
    )(args);

export default {
  title: 'Components/Forms',
  tags: ['autodocs'],
  parameters: { docs },
  args: themeControls.args,
  argTypes: themeControls.argTypes,
};

export const Checkboxes = {
  render: renderForm(checkboxTwig),
  args: {
    checkboxes: [
      { title: 'Book repair', checked: 'checked' },
      { title: 'Printmaking' },
      { title: 'Community archives', disabled: 'disabled' },
    ],
  },
};

export const RadioButtons = {
  render: renderForm(radioTwig),
  args: {
    radios: [
      { title: 'Morning', checked: 'checked' },
      { title: 'Afternoon' },
      { title: 'Evening', disabled: 'disabled' },
    ],
  },
};

export const SelectDropdowns = {
  render: renderForm(selectTwig),
  args: {
    select: [
      { value: '', title: 'Choose a location' },
      { value: 'library', title: 'Library' },
      { value: 'community-center', title: 'Community center' },
    ],
  },
};

export const TextfieldsExamples = {
  render: renderForm(textfieldsTwig),
};
