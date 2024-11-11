import bannerTwig from './banner.twig';
import { props } from './banner.component.yml';

import './banner';

export default {
  title: 'Components/Banner',
  decorators: [
    (story) =>
      `<div style="max-width: 890px; margin: 0 auto;">${story()}</div>`,
  ],
};

export const Banner = () =>
  `<div class="banner-list">${props.example
    .map((data) => bannerTwig(data))
    .join('')}</div>`;
