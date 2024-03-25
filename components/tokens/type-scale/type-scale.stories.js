import template from './type-scale.twig';
import figma from '../../../.storybook/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { fontSize: tokens.fontSize };

export default {
  title: 'Tokens/Type Scale',
};

export const TypeScale = () => template(data);

TypeScale.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.typeScale,
  },
};
