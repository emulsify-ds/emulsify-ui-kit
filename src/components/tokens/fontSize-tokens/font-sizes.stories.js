import fontSizeTemplate from './_fontSizes.twig';
import tokens from '../../../tokens/transformed.tokens.json';

/**
 * Storybook Definition.
 */
export default { title: 'Tokens/Font Sizes' };

const fontSizeData = { fontSize: tokens['font-size'] };

export const FontSizes = () => fontSizeTemplate(fontSizeData);
