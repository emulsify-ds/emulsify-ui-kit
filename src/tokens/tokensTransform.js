import StyleDictionary from 'style-dictionary';

const ProjectStyleDictionary = new StyleDictionary('config/sd.config.json');

const pixelsToRem = (px) => {
  const rem = 16;
  return `${px / rem}rem`;
};

const appendPX = (value) => {
  return `${value}px`;
};

ProjectStyleDictionary.registerTransform({
  name: 'toRem/pxToRem',
  type: 'value',
  filter(token) {
    return (
      token.type === 'sizing' ||
      token.type === 'spacing' ||
      token.type === 'borderRadius' ||
      token.type === 'fontSizes' ||
      token.path[0] === 'breakpoint'
    );
  },
  transform(token) {
    return pixelsToRem(token.value);
  },
});

ProjectStyleDictionary.registerTransform({
  name: 'toPX/appendPX',
  type: 'value',
  filter(token) {
    return token.type === 'borderWidth';
  },
  transform(token) {
    return appendPX(token.value);
  },
});

ProjectStyleDictionary.buildAllPlatforms();
