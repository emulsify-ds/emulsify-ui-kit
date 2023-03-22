import template from './button.twig';
import figma from '../../.storybook/configma.json';

export default {
  title: 'Components/Button',
  decorators: [
    (story) => `<div><h2 class="sb-title">Button</h2>${story()}</div>`,
  ],
};

export const Default = () => `
  <p>Default:</p>
  ${template()}
  <p>Hover:</p>
  ${template({ buttonAdditionalClasses: ['button--hover'] })}
  <p>Focus:</p>
  ${template({ buttonAdditionalClasses: ['button--focus'] })}
`;

Default.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
