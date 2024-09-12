import buttonTwig from './button.twig';

export default {
  title: 'Components/Button',
  decorators: [(story) => `${story()}`],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    buttonElement: {
      type: 'select',
      name: 'Button Element',
      options: {
        '<button>': 'button',
        '<a>': 'a',
      },
    },
    buttonStyle: {
      type: 'select',
      name: 'Button Style',
      options: {
        Primary: 'primary',
        Secondary: 'secondary',
      },
    },
  },
  args: {
    buttonElement: 'button',
    buttonStyle: 'filled',
  },
};

export const Button = ({ buttonElement, buttonStyle }) =>
  buttonTwig({
    button__element: buttonElement,
    button__href: '#',
    button__content: `${buttonStyle} Button`,
    button__style: buttonStyle,
  });
