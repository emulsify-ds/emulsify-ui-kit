const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary').extend(
  'sdTokens.config.json',
);

const pixelsToRem = (px) => {
  const rem = 16;
  return `${px / rem}rem`;
};

const appendPX = (value) => {
  return `${value}px`;
};

registerTransforms(StyleDictionary, { excludeParentKeys: true });

StyleDictionary.registerTransform({
  name: 'toRem/pxToRem',
  type: 'value',
  matcher(token) {
    return (
      token.type === 'sizing' ||
      token.type === 'spacing' ||
      token.type === 'borderRadius' ||
      token.path[0] === 'breakpoint' ||
      token.path[0] === 'fontSize'
    );
  },
  transformer(token) {
    return pixelsToRem(token.value);
  },
});

StyleDictionary.registerTransform({
  name: 'toPX/appendPX',
  type: 'value',
  matcher(token) {
    return token.type === 'borderWidth';
  },
  transformer(token) {
    return appendPX(token.value);
  },
});

StyleDictionary.buildAllPlatforms();
