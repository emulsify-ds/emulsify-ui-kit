import template from './spacing-tokens.twig';
import figma from '../../../.storybook/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { spacing: tokens.spacing };

export default {
  title: 'Tokens/Spacing',
};

export const Spacing = () => template(data);

Spacing.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.spacing,
  },
};
