import { renderTwig } from '@emulsify/core/storybook';
import linkData from './link.component.yml';
import linkTwig from './link.twig';

const { properties } = linkData.props;

export default {
  title: 'Components/Typography/Links',
  render: renderTwig(linkTwig),
};

export const basic = {
  args: {
    link__url: properties.link__url.data,
    link__content: properties.link__content.data,
    link__attributes: properties.link__attributes.data,
    link__style: 'default',
  },
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const noUnderline = {
  args: {
    ...basic.args,
    link__style: 'no-underline',
  },
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const inverse = {
  args: basic.args,
  decorators: [
    (Story) => (
      <div className="cl-container" data-component-theme="inverse">
        <Story />
      </div>
    ),
  ],
};
