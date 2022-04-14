const StyleDictionary =
  require('style-dictionary').extend('tokens.config.json');

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
      token.path[0] === 'breakpoint' ||
      token.path[0] === 'fontSize'
    );
  },
  transformer(token) {
    return pixelsToRem(token.value);
  },
});

StyleDictionary.buildAllPlatforms();
