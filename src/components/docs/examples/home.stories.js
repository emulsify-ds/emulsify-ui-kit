import template from './home.twig';
import data from './home.yml';
import heroImage from '../../../images/example/hero.jpg';
import watchImage1 from '../../../images/example/watch-Image.png';
import watchImage2 from '../../../images/example/watch-Image-1.png';
import watchImage3 from '../../../images/example/watch-Image-2.png';
import celebratingImage1 from '../../../images/example/celebrating-Image-1.png';
import celebratingImage2 from '../../../images/example/celebrating-Image-2.png';
import celebratingImage3 from '../../../images/example/celebrating-Image-3.png';
import celebratingImage4 from '../../../images/example/celebrating-Image-4.png';

const celebratingImages = [
  celebratingImage1,
  celebratingImage2,
  celebratingImage3,
  celebratingImage4,
];
const watchImages = [watchImage1, watchImage2, watchImage3];

export default {
  title: 'Pages/Home',
  decorators: [
    (story) =>
      `<div style="background: var(--color-grays-700); padding: 0;margin:0;">${story()}</div>`,
  ],
};

export const Home = () =>
  template({ data, heroImage, watchImages, celebratingImages });
