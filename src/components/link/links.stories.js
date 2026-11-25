import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import linkData from './link.component.yml';
import linkTwig from './link.twig';

const { properties } = linkData.props;

export default {
  title: 'Components/Typography/Links',
  render: renderTwig(withStorybookPadding(linkTwig)),
};

export const basic = {
  args: {
    link__url: properties.link__url.data,
    link__content: properties.link__content.data,
    link__attributes: properties.link__attributes.data,
    link__style: 'default',
  },
};

export const noUnderline = {
  args: {
    ...basic.args,
    link__style: 'no-underline',
  },
};

export const inverse = {
  args: basic.args,
  render: renderTwig(withStorybookPadding(linkTwig, { theme: 'inverse' })),
};
