import template from './button.twig';
import figma from '../../../../.storybook/configma.json';

export default {
  title: 'Components/Button',
};

export const Button = () => template();

Button.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
