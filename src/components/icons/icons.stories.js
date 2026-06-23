import { renderTwig } from '@emulsify/core/storybook';
import iconTwig from './icons.twig';

const svgIcons = import.meta.glob('/assets/icons/**/*.svg');

const filesNames = Object.keys(svgIcons).map((path) =>
  path.replace('/assets/icons/', '').replace('.svg', ''),
);

export default {
  title: 'Components/Media/Icons',
  render: renderTwig(iconTwig),
};

export const icons = {
  args: {
    icons: filesNames,
  },
};
