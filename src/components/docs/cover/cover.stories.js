import template from './cover.twig';
import backgroundImage from '../../../images/cover.png';

const data = { backgroundImage };

export default {
  title: 'Cover/Cover',
};

export const Cover = () => template(data);
