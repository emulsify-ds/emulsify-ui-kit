import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import motionTwig from './motion.twig';
import motionData from './motion.yml';

export default {
  title: 'Tokens/Motion',
  render: renderTwig(withStorybookPadding(motionTwig)),
};

export const motion = {
  args: motionData,
};
