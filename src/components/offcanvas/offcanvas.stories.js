import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './offcanvas.component.yml';
import docs from './offcanvas.docs.js';
import template from './offcanvas.twig';
import './offcanvas.js';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Offcanvas',
  tags: ['autodocs'],
  parameters: { docs },
  render: (args, { viewMode } = {}) =>
    renderTwig(withStorybookContainer(template), {
      wrapper: viewMode === 'docs' ? 'div' : 'main',
    })(args),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: {
    ...themeControls.argTypes,
    offcanvas__type: { options: ['pane', 'modal'], control: 'select' },
    offcanvas__direction: {
      options: ['top', 'right', 'bottom', 'left'],
      control: 'select',
      if: { arg: 'offcanvas__type', eq: 'pane' },
    },
  },
};

export const Offcanvas = {
  args: { offcanvas__id: 'workshop-details' },
};

export const Modal = {
  args: {
    offcanvas__id: 'registration-details',
    offcanvas__heading: 'Registration details',
    offcanvas__trigger__text: 'View registration details',
    offcanvas__type: 'modal',
    offcanvas__content:
      '<p>Registration closes the day before the workshop.</p><p><a href="/registration">Review the registration form</a></p>',
    offcanvas__suffix: '<p>Check your email after registering.</p>',
  },
};
