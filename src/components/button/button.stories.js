import template from './button.twig';
import figma from '../../../.storybook/configma.json';

export default {
  title: 'Components/Button',
  decorators: [(story) => `${story()}`],
};

export const Button = () => `
  <p>Default:</p>
  ${template()}
  <p>Hover:</p>
  ${template({ button__additional_classes: ['button--hover'] })}
  <p>Focus:</p>
  ${template({ button__additional_classes: ['button--focus'] })}
`;

Button.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
