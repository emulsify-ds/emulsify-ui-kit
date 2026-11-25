import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import placeHolderTwig from './placeholder.twig';

export default {
  title: 'Layout/Place Holder',
  render: renderTwig(withStorybookPadding(placeHolderTwig)),
};

export const placeHolder = {};
