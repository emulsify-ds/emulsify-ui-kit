import template from './basicPage.twig';
import logo from '../../../images/logo.svg';

const data = { logo };

export default {
  title: 'Examples/Basic Page',
};

export const BasicPage = () => template(data);
