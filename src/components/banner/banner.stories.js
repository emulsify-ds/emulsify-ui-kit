import bannerTwig from './banner.twig';
import { props } from './banner.component.yml';

import '../video/playback';

const bannerData = props.properties;

export default {
  title: 'Components/Banner',
  argTypes: {
    type: {
      name: 'Media Type',
      control: { type: 'select' },
      options: {
        Image: 'image',
        Video: 'video',
      },
    },
    alignment: {
      name: 'Banner Alignment',
      type: 'select',
      options: {
        'Left': 'left',
        'Center': 'center',
      },
    },
    heading: {
      name: 'Banner Heading',
      type: 'string',
    },
    text: {
      name: 'Banner Text',
      type: 'string',
    },
    link: {
      name: 'Banner Link',
      type: 'string',
    },
  },
  args: {
    type: 'image',
    alignment: bannerData.banner__alignment.data,
    heading: bannerData.banner__heading.data,
    text: bannerData.banner__text.data,
    link: bannerData.banner__link.data,
  },
};

export const Banner = ({
  type,
  alignment,
  heading,
  text,
  link,
}) => bannerTwig({
  banner__image: bannerData.banner__image.data,
  banner__video: bannerData.banner__video.data,
  banner__media: type,
  banner__alignment: alignment,
  banner__heading: heading,
  banner__text: text,
  banner__link_items: [{
    url: '#',
    content: link,
  }]
});
