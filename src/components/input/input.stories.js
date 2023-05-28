import template from './input.twig';
import figma from '../../../.storybook/configma.json';

export default {
  title: 'Components/Forms/Input',
  decorators: [
    (story) => `<div><h2 class="sb-title">Input</h2>${story()}</div>`,
  ],
};

export const Default = () => template();
export const Warning = () => template({ warning: true });

Default.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
