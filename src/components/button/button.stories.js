import { renderTwig } from '@emulsify/core/storybook';
import buttonTwig from './button.twig';

export default {
  title: 'Components/Button',
  render: renderTwig(buttonTwig),
  argTypes: {
    button__element: {
      name: 'Button Element',
      control: 'select',
      options: ['button', 'a'],
    },
    button__style: {
      name: 'Button Style',
      control: 'select',
      options: ['primary', 'clean', 'disabled'],
    },
    button__content: { name: 'Content', control: 'text' },
    button__href: { name: 'Href', control: 'text' },
    button__icon_only: { name: 'Icon Only (A11y)', control: 'text' },
    button__icon: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const basic = {
  args: {
    button__element: 'button',
    button__style: 'primary',
    button__content: 'Primary Button',
    button__href: '#',
  },
};

export const iconRight = {
  args: {
    ...basic.args,
    button__content: 'Primary Icon Right',
    button__icon: {
      right: true,
      name: 'arrow-right',
      decorative: true,
    },
  },
};

export const iconLeft = {
  args: {
    ...basic.args,
    button__content: 'Primary Icon Left',
    button__icon: {
      left: true,
      name: 'arrow-left',
      decorative: true,
    },
  },
};

export const iconOnly = {
  args: {
    ...basic.args,
    button__content: '',
    button__icon_only: 'Main Menu',
    button__icon: {
      left: true,
      name: 'menu',
      decorative: true,
    },
  },
};
