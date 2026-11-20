import { renderTwig } from '@emulsify/core/storybook';
import mediaBoxData from './media-box.component.yml';
import mediaBoxTwig from './media-box.twig';
import '../video/video-embed';

const { properties } = mediaBoxData.props;

export default {
  title: 'Components/Media Box',
  render: renderTwig(mediaBoxTwig),
  argTypes: {
    media_box__type: {
      name: 'Media Type',
      control: 'select',
      options: ['image', 'video'],
    },
    media_box__width: {
      name: 'Media Box Width',
      control: 'select',
      options: ['compact', 'standard'],
    },
    media_box__heading: {
      name: 'Heading',
      control: 'text',
    },
    media_box__text: {
      name: 'Text',
      control: 'text',
    },
    media_box__show_caption: {
      name: 'Show Media Caption',
      control: 'boolean',
    },
    media_box__caption: {
      name: 'Caption',
      control: 'text',
    },
    media_box__show_copyright: {
      name: 'Show Media Copyright',
      control: 'boolean',
    },
    media_box__copyright: {
      name: 'Copyright',
      control: 'text',
    },
  },
};

export const mediaBox = {
  args: {
    media_box__type: 'image',
    media_box__width: 'compact',
    media_box__heading: properties.media_box__heading.data,
    media_box__text: properties.media_box__text.data,
    media_box__show_caption: true,
    media_box__caption: properties.media_box__caption.data,
    media_box__show_copyright: true,
    media_box__copyright: properties.media_box__copyright.data,
  },
};
