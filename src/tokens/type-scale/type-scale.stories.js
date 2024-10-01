import typeScaleTwig from './type-scale.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const typeScaleData = { fontSize: tokens['font-size'] };

export default {
  title: 'Tokens/Type Scale',
};

export const TypeScale = () => typeScaleTwig(typeScaleData);

TypeScale.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.typeScale,
  },
};
