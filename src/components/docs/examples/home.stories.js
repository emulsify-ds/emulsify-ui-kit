import template from './home.twig';
import data from './home.yml';
import heroImage from '../../../../assets/images/example/hero.jpg';
import watchImage1 from '../../../../assets/images/example/watch-Image.png';
import watchImage2 from '../../../../assets/images/example/watch-Image-1.png';
import watchImage3 from '../../../../assets/images/example/watch-Image-2.png';
import celebratingImage1 from '../../../../assets/images/example/celebrating-Image-1.png';
import celebratingImage2 from '../../../../assets/images/example/celebrating-Image-2.png';
import celebratingImage3 from '../../../../assets/images/example/celebrating-Image-3.png';
import celebratingImage4 from '../../../../assets/images/example/celebrating-Image-4.png';

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
      `<div style="background: var(--colors-grays-700); padding: 0;">${story()}</div>`,
  ],
};

export const Home = () =>
  template({ data, heroImage, watchImages, celebratingImages });
