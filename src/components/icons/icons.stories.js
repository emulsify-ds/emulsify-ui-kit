import iconTwig from './icons.twig';

const svgIcons = require.context('../../../assets/icons/', true, /\.svg$/);
const icons = [];
svgIcons.keys().forEach((key) => {
  const icon = key.split('./')[1].split('.')[0];
  icons.push(icon);
});

export default { title: 'Components/Media/Icons' };

export const Icons = () => iconTwig({ icons });
