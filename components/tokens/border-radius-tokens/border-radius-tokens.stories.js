import template from './border-radius-tokens.twig';
import figma from '../../../.storybook/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { radius: tokens.radius };

export default {
  title: 'Tokens/Border Radius',
};

export const BorderRadius = () => template(data);

BorderRadius.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.borderRadius,
  },
};
