const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary, { casing: 'kebab' });

const sd = StyleDictionary.extend({
  source: ['**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      buildPath: 'src/components/tokens/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'css/variables',
        },
      ],
    },
  },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
