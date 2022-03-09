import template from './spacing-tokens.twig';

import tokens from '../../../tokens/sd.tokens.json';

const data = { spacing: tokens.spacing };

export default {
  title: 'Tokens/Spacing',
};

export const Spacing = () => template(data);
