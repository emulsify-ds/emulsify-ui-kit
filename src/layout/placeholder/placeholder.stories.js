import { renderTwig } from '@emulsify/core/storybook';
import placeHolderTwig from './placeholder.twig';

export default {
  title: 'Layout/Place Holder',
  render: renderTwig(placeHolderTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const placeHolder = {};
