import template from './button.twig';
import { props } from './button.component.yml';
import figma from '../../../config/configma.json';

const buttonData = props.properties.button__additional_classes.data;

export default {
  title: 'Components/Button',
  decorators: [(story) => `${story()}`],
};

export const Button = () => `
  <p>Default:</p>
  ${template()}
  <p>Hover:</p>
  ${template({ button__additional_classes: [`${buttonData[0]}`] })}
  <p>Focus:</p>
  ${template({ button__additional_classes: [`${buttonData[1]}`] })}
`;

Button.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
