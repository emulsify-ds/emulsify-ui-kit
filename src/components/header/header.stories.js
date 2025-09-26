import template from './header.twig';
import { props } from './header.component.yml';
import figma from '../../../.storybook/configma.json';
import './header';

const headerData = {
  header__branding: '<img src="/path/to/logo.png" alt="Branding">',
  header__menu: [
    { label: 'Home', url: '/' },
    {
      label: 'About',
      url: '/about',
      submenu: [{ label: 'Team', url: '/about/team' }],
    },
    {
      label: 'Services',
      url: '/services',
      submenu: [{ label: 'Consulting', url: '/services/consulting' }],
    },
  ],
  header__search: { placeholder: 'Search...', has_focus: false },
};

export default {
  title: 'Components/Header',
  decorators: [(story) => `${story()}`],
};

export const Header = () => template(headerData);

Header.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.header,
  },
};
