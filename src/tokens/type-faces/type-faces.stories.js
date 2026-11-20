import { renderTwig } from '@emulsify/core/storybook';

import typeFacesTwig from './type-faces.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const typeFacesData = { fontFamily: tokens['font-family'] };

export default {
  title: 'Tokens/Type Faces',
  render: renderTwig(typeFacesTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const TypeFaces = {
  args: typeFacesData,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.typeScale,
    },
  },
};
