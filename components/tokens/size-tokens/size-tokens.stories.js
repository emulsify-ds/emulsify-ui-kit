import template from './size-tokens.twig';
import figma from '../../../.storybook/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { size: tokens.size };

export default {
  title: 'Tokens/Size',
};

export const Size = () => template(data);

Size.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.size,
  },
};
