import typeFacesTwig from './type-faces.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const typeFacesData = { fontFamily: tokens['font-family'] };

export default {
  title: 'Tokens/Type Faces',
};

export const TypeFaces = () => typeFacesTwig(typeFacesData);

TypeFaces.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.typeScale,
  },
};
