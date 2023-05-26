import template from './border-tokens.twig';
import figma from '../../../../.storybook/configma.json';

import tokens from '../../../tokens/transformed.tokens.json';

const data = { border: tokens.border };

export default {
  title: 'Tokens/Border',
};

export const Border = () => template(data);

Border.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.border,
  },
};
