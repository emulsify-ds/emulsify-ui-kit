import buttonTwig from './button.twig';

// control data.
import controlData from '../../util/controlData.yml';

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
    componentTheme: {
      type: 'select',
      name: 'Component Theme',
      control: {
        type: 'select',
        options: controlData.color_variant,
      },
    },
  },
  args: {
    buttonElement: 'button',
    buttonStyle: 'filled',
    componentTheme: 'base',
  },
};

export const Button = ({ buttonElement, buttonStyle, componentTheme }) => `
  <div class="cl-container">
    <h1>${buttonStyle}</h1>
  </div>
  <div class="cl-container cl-spaced-row">
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Button`,
      button__style: buttonStyle,
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Right`,
      button__style: buttonStyle,
      button__icon: {
        right: true,
        name: 'arrowRight',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Left`,
      button__style: buttonStyle,
      button__icon: {
        left: true,
        name: 'arrowLeft',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__style: buttonStyle,
      button__icon_only: 'Main Menu',
      button__icon: {
        left: true,
        name: 'menu',
        decorative: true,
      },
    })}
  </div>
  <div class="cl-container cl-spaced-row" data-component-theme="${componentTheme} dark inverse">
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Button`,
      button__style: buttonStyle,
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Right`,
      button__style: buttonStyle,
      button__icon: {
        right: true,
        name: 'arrowRight',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Left`,
      button__style: buttonStyle,
      button__icon: {
        left: true,
        name: 'arrowLeft',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__style: buttonStyle,
      button__icon_only: 'disabled',
      button__icon: {
        left: true,
        name: 'menu',
        decorative: true,
      },
    })}
  </div>
  <div class="cl-container cl-spaced-row" data-component-theme="${componentTheme} base inverse">
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Button`,
      button__style: buttonStyle,
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Right`,
      button__style: buttonStyle,
      button__icon: {
        right: true,
        name: 'arrowRight',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Left`,
      button__style: buttonStyle,
      button__icon: {
        left: true,
        name: 'arrowLeft',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__style: buttonStyle,
      button__icon_only: 'Main Menu',
      button__icon: {
        left: true,
        name: 'menu',
        decorative: true,
      },
    })}
  </div>
  <div class="cl-container cl-spaced-row" data-component-theme="${componentTheme} light">
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Button`,
      button__style: buttonStyle,
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Right`,
      button__style: buttonStyle,
      button__icon: {
        right: true,
        name: 'arrowRight',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Left`,
      button__style: buttonStyle,
      button__icon: {
        left: true,
        name: 'arrowLeft',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__style: buttonStyle,
      button__icon_only: 'Main Menu',
      button__icon: {
        left: true,
        name: 'menu',
        decorative: true,
      },
    })}
  </div>
  <div class="cl-container cl-spaced-row" data-component-theme="${componentTheme} bright">
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Button`,
      button__style: buttonStyle,
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Right`,
      button__style: buttonStyle,
      button__icon: {
        right: true,
        name: 'arrowRight',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__content: `${buttonStyle} Icon Left`,
      button__style: buttonStyle,
      button__icon: {
        left: true,
        name: 'arrowLeft',
        decorative: true,
      },
    })}
    ${buttonTwig({
      button__element: buttonElement,
      button__href: '#',
      button__style: buttonStyle,
      button__icon_only: 'Main Menu',
      button__icon: {
        left: true,
        name: 'menu',
        decorative: true,
      },
    })}
  </div>
`;
