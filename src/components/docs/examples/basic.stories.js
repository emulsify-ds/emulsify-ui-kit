import template from './basic.twig';
import image from '../../../images/example/basic-camera-image.png';
import data from './basic.yml';

export default {
  title: 'Pages/Basic',
  decorators: [
    (story) =>
      `<div style="background: var(--color-grays-700); padding: 0;margin:0;">${story()}</div>`,
  ],
};

export const Basic = () => template({ data, image });
