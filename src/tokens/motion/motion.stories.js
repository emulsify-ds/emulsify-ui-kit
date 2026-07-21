import { renderTwig } from '@emulsify/core/storybook';

import motionTwig from './motion.twig';
import motionData from './motion.yml';

export default {
  title: 'Tokens/Motion',
  render: renderTwig(motionTwig),
};

export const motion = {
  args: motionData,
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};
