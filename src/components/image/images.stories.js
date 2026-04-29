import imageTwig from './image.twig';
import imageData from './image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Media/Image',
  argTypes: {
    show_caption: {
      name: 'Show Image Caption',
      type: 'boolean',
    },
    caption: {
      name: 'Caption',
      type: 'string',
    },
    show_copyright: {
      name: 'Show Image Caption',
      type: 'boolean',
    },
    copyright: {
      name: 'Copyright',
      type: 'string',
    },
  },
  args: {
    show_caption: true,
    caption: imageData.image__caption,
    show_copyright: true,
    copyright: imageData.image__copyright,
  },
};

export const image = ({ show_caption, caption, show_copyright, copyright }) =>
  imageTwig({
    ...imageData.responsive_images['1x1'],
    image__show_caption: show_caption,
    image__show_copyright: show_copyright,
    image__caption: caption,
    image__copyright: copyright,
  });
