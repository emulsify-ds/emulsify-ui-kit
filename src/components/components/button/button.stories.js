import template from './button.twig';
import figma from '../../../../.storybook/configma.json';

export default {
  title: 'Components/Button',
  decorators: [
    (story) => `<div><h2 class="sb-title">Button</h2>${story()}</div>`,
  ],
};

export const Default = () => template();
export const Hover = () =>
  template({ buttonAdditionalClasses: ['button--hover'] });
export const Focus = () =>
  template({ buttonAdditionalClasses: ['button--focus'] });

Default.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
