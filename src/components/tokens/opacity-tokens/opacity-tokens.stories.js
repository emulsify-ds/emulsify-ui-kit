import template from './opacity-tokens.twig';
import figma from '../../../../.storybook/configma.json';

import tokens from '../../../tokens/transformed.tokens.json';

const data = { opacity: tokens.opacity };

export default {
  title: 'Tokens/Opacity',
};

export const Opacity = () => template(data);

Opacity.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.opacity,
  },
};
