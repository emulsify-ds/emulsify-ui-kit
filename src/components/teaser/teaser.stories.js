import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './teaser.component.yml';
import docs from './teaser.docs.js';
import teaserTwig from './teaser.twig';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Components/Teaser',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(teaserTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    ...widthControls.args,
    teaser__image__width: 847,
    teaser__image__height: 451,
    width: 'narrow',
  },
  argTypes: {
    ...themeControls.argTypes,
    ...widthControls.argTypes,
    ...Object.fromEntries(
      Object.entries(schema.props.properties)
        .filter(([, definition]) => definition.enum)
        .map(([name, definition]) => [
          name,
          {
            control: 'select',
            options: definition.enum.filter((value) => value !== null),
          },
        ]),
    ),
  },
};

export const Teaser = {};

export const Card = {
  args: { teaser__style: 'card' },
};

export const Inline = {
  args: {
    width: 'wide',
    teaser__layout: 'inline',
    teaser__style: 'spotlight',
    teaser__media__alignment: 'left',
    teaser__media__shape: 'square',
  },
};

export const WithoutMedia = {
  args: {
    teaser__style: 'framed',
    teaser__show_media: false,
    teaser__heading: 'Reserve a workspace',
    teaser__content: 'Book a quiet room for your next project.',
    teaser__meta: [],
    teaser__url: null,
    teaser__ctas: [],
  },
};
