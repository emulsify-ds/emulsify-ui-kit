import { renderTwig } from '@emulsify/core/storybook';
import bannerData from './banner.component.yml';
import bannerTwig from './banner.twig';
import '../video/playback';

const { properties } = bannerData.props;

export default {
  title: 'Components/Banner',
  render: renderTwig(bannerTwig),
  argTypes: {
    banner__media: {
      name: 'Media Type',
      control: 'select',
      options: ['image', 'video'],
    },
    banner__alignment: {
      name: 'Banner Alignment',
      control: 'select',
      options: properties.banner__alignment.enum || ['left', 'center'],
    },
    banner__heading: {
      name: 'Banner Heading',
      control: 'text',
    },
    banner__text: {
      name: 'Banner Text',
      control: 'text',
    },
    banner__link_items: {
      table: {
        disable: true,
      },
    },
    banner__image: { table: { disable: true } },
    banner__video: { table: { disable: true } },
  },
};

export const banner = {
  args: {
    banner__image: properties.banner__image.data,
    banner__video: properties.banner__video.data,
    banner__media: 'image',
    banner__alignment: properties.banner__alignment.data,
    banner__heading: properties.banner__heading.data,
    banner__text: properties.banner__text.data,
    banner__link_items: [
      {
        url: '#',
        content: properties.banner__link?.data || 'Read more',
      },
    ],
  },
};
