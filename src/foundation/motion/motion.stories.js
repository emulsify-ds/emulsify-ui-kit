import motion from './motion.twig';

import motionData from './motion.yml';

/**
 * Add storybook definition for Animations.
 */
export default { title: 'Base/Motion' };

export const Motion = () =>
  `<div class="cl-container">${motion(motionData)}</div>`;
