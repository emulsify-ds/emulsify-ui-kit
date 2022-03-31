import template from './cover.twig';
import backgroundImage from '../../../images/cover.png';
import logo from '../../../images/4klogo.svg';

const data = { backgroundImage, logo };

export default {
  title: '0 Cover/Cover',
};

export const Cover = () => template(data);
