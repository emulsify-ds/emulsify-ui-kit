const StyleDictionary = require('style-dictionary');

const pixelsToRem = (px) => {
  const rem = 16;
  return `${px / rem}rem`;
};

StyleDictionary.registerTransform({
  name: 'toRem/pxToRem',
  type: 'value',
  matcher(token) {
    return (
      token.type === 'sizing' ||
      token.type === 'spacing' ||
      token.path[0] === 'radius' ||
      token.path[0] === 'breakpoint'
    );
  },
  transformer(token) {
    return pixelsToRem(token.value);
  },
});

module.exports = {
  source: ['tokens/sd.tokens.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'color/css',
        'toRem/pxToRem',
      ],
      files: [
        {
          destination: 'components/tokens/_tokens.scss',
          format: 'css/variables',
        },
      ],
    },
  },
};
