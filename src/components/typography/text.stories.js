import { renderTwig } from '@emulsify/core/storybook';
import { mapDataToTwig } from '../../util/dataTransformers';

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

export default {
  title: 'Components/Typography',
  decorators: [
    (Story) => (
      <div className="cl-container">
        <div className="text-long">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const headings = {
  render: renderTwig(headingTwig),
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
  render: renderTwig(blockquoteTwig),
  args: blockquoteData,
};

export const preformatted = {
  render: renderTwig(preTwig),
};

export const random = {
  render: renderTwig(paragraphTwig),
};

export const code = {
  render: renderTwig(codeTwig),
  args: codeData,
};
