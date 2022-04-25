import template from './vision.twig';
import logo from '../../../images/4k-logo-light-bkg.svg';

const data = { logo };

export default {
  title: 'Docs/Vision',
};

export const Vision = () => template(data);
