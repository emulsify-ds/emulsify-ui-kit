import sizeTwig from './sizes.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const sizeData = { size: tokens.size };

export default {
  title: 'Tokens/Sizes',
};

export const Sizes = () => sizeTwig(sizeData);

Sizes.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.size,
  },
};
