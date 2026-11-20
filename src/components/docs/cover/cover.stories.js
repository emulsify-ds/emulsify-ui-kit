import { renderTwig } from '@emulsify/core/storybook';
import coverTwig from './cover.twig';

export default {
  title: 'Docs/Cover',
  render: renderTwig(coverTwig),
};

export const cover = {};
