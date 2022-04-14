import template from './type-scale.twig';
import tokens from '../../../tokens/sd.tokens.json';
import figma from '../../../../.storybook/configma.json';

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
