import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './image.component.yml';
import docs from './image.docs.js';
import imageTwig from './image.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Image',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(imageTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    image__width: 847,
    image__height: 451,
  },
  argTypes: {
    ...themeControls.argTypes,
    image__loading: { control: 'select', options: ['lazy', 'eager'] },
    image__decorative: { control: 'boolean' },
  },
};

export const Image = {};

export const Figure = {
  args: {
    image__srcset: 'assets/images/example/basic-camera-image.png 847w',
    image__sizes: '(min-width: 768px) 768px, 100vw',
    image__caption: 'A camera set up for a location shoot.',
  },
};

export const Decorative = {
  args: {
    image__decorative: true,
    image__alt: '',
  },
};
