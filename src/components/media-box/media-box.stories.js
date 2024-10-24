// Twig templates
import mediaBoxTwig from './media-box.twig';
// Data files
import { props } from './media-box.component.yml';
const mediaBoxData = props.properties;

import '../video/video-embed';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Media Box',
  argTypes: {
    type: {
      name: 'Media Type',
      control: { type: 'select' },
      options: {
        Image: 'image',
        Video: 'video',
      },
    },
    width: {
      name: 'Media Box Width',
      control: { type: 'select' },
      options: {
        Compact: 'compact',
        Standard: 'standard',
      },
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    text: {
      name: 'Text',
      type: 'string',
    },
    show_caption: {
      name: 'Show Media Caption',
      type: 'boolean',
    },
    caption: {
      name: 'Caption',
      type: 'string',
    },
    show_copyright: {
      name: 'Show Media Caption',
      type: 'boolean',
    },
    copyright: {
      name: 'Copyright',
      type: 'string',
    },
  },
  args: {
    type: 'image',
    width: 'compact',
    heading: mediaBoxData.media_box__heading.data,
    text: mediaBoxData.media_box__text.data,
    show_caption: true,
    caption: mediaBoxData.media_box__caption.data,
    show_copyright: true,
    copyright: mediaBoxData.media_box__copyright.data,
  },
};

export const mediaBox = ({
  type,
  width,
  heading,
  text,
  show_caption,
  caption,
  show_copyright,
  copyright,
}) =>
  mediaBoxTwig({
    media_box__type: type,
    media_box__width: width,
    media_box__show_caption: show_caption,
    media_box__caption: caption,
    media_box__show_copyright: show_copyright,
    media_box__copyright: copyright,
    media_box__heading: heading,
    media_box__text: text,
  });
