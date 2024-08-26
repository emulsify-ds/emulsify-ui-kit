import bannerTwig from './banner.twig';
import { props } from './banner.component.yml';
import bannerVideo from '../../media/video-placeholder.mp4';
import bannerImage from '../../images/example/banner-image.jpg';
import './banner';

export default {
  title: 'Components/Banner',
  decorators: [
    (story) =>
      `<div style="max-width: 890px; margin: 0 auto;">${story()}</div>`,
  ],
};

function getBannerData(data) {
  const newData = Object.assign({}, data);
  if (data && typeof data === 'object' && 'banner__video' in data) {
    newData.banner__video = bannerVideo;
  }
  if (data && typeof data === 'object' && 'banner__background_image' in data) {
    newData.banner__background_image = bannerImage;
  }
  return newData;
}

export const Banner = () =>
  `<div class="banner-list">${props.example
    .map((data) => bannerTwig(getBannerData(data)))
    .join('')}</div>`;
