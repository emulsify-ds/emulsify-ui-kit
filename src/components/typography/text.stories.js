import { renderTwig } from '@emulsify/core/storybook';
import { mapDataToTwig } from '../../util/dataTransformers';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import paragraphTwig from './text/inline-elements.twig';
import blockquoteTwig from './text/blockquote.twig';
import headingTwig from './heading/heading.twig';
import codeTwig from './text/code.twig';
import preTwig from './text/pre.twig';

import { props as blockquoteProps } from './text/blockquote.component.yml';
import { props as headingProps } from './heading/heading.component.yml';
import { props as codeProps } from './text/code.component.yml';

const blockquoteData = mapDataToTwig(blockquoteProps.properties);
const headingData = mapDataToTwig(headingProps.properties);
const codeData = mapDataToTwig(codeProps.properties);
const padding = { innerClass: 'text-long' };

export default {
  title: 'Components/Typography',
};

export const headings = {
  render: renderTwig(withStorybookPadding(headingTwig, padding)),
  args: headingData,
  argTypes: {
    heading__level: {
      name: 'Heading Level',
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    heading: {
      name: 'Heading',
      control: 'text',
    },
    heading_url: {
      table: {
        disable: true,
      },
    },
  },
};

export const blockquote = {
  render: renderTwig(withStorybookPadding(blockquoteTwig, padding)),
  args: blockquoteData,
};

export const preformatted = {
  render: renderTwig(withStorybookPadding(preTwig, padding)),
};

export const random = {
  render: renderTwig(withStorybookPadding(paragraphTwig, padding)),
};

export const code = {
  render: renderTwig(withStorybookPadding(codeTwig, padding)),
  args: codeData,
};
