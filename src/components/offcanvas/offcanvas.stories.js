import { renderTwig } from '@emulsify/core/storybook';

import offcanvasTwig from './offcanvas.twig';
import { mapDataToTwig } from '../../util/dataTransformers.js';

import { props } from './offcanvas.component.yml';

import './offcanvas';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Offcanvas',
  render: renderTwig(offcanvasTwig),
  argTypes: {
    offcanvas__type: {
      name: 'Type',
      control: { type: 'select' },
      options: props.properties.offcanvas__type.enum,
    },
    offcanvas__direction: {
      name: 'Pane direction',
      control: { type: 'select' },
      options: props.properties.offcanvas__direction.enum,
      if: { arg: 'offcanvas__type', eq: 'pane' },
    },
    offcanvas__theme: {
      name: 'Theme',
      control: { type: 'select' },
      options: props.properties.offcanvas__theme.enum,
    },
    offcanvas__heading: { name: 'Heading', type: 'string' },
    offcanvas__show_heading: { name: 'Show heading', type: 'boolean' },
  },
  args: mapDataToTwig(props.properties),
};

export const Offcanvas = {};
