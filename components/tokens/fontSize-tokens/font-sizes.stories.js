import fontSizeTemplate from './_fontSizes.twig';
import tokens from '../../../src/tokens/transformed.tokens.json';

/**
 * Storybook Definition.
 */
export default { title: 'Tokens/Font Sizes' };

const fontSizeData = { fontSize: tokens.fontSize };

export const FontSizes = () => fontSizeTemplate(fontSizeData);
