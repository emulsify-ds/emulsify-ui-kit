import { renderTwig } from '@emulsify/core/storybook';

import imageTwig from './image.twig';
import imageData from './image.yml';

export default {
  title: 'Components/Media/Image',
  render: renderTwig(imageTwig),
  argTypes: {
    image__show_caption: {
      name: 'Show Image Caption',
      control: 'boolean',
    },
    image__caption: {
      name: 'Caption',
      control: 'text',
    },
    image__show_copyright: {
      name: 'Show Image Copyright',
      control: 'boolean',
    },
    image__copyright: {
      name: 'Copyright',
      control: 'text',
    },
  },
};

export const image = {
  args: {
    ...imageData.responsive_images['1x1'],
    image__show_caption: true,
    image__caption: imageData.image__caption,
    image__show_copyright: true,
    image__copyright: imageData.image__copyright,
  },
};
