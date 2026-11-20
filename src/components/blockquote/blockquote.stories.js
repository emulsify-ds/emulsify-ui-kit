import { renderTwig } from '@emulsify/core/storybook';
import blockquoteData from './blockquote.component.yml';
import blockquoteTwig from './blockquote.twig';

const { properties } = blockquoteData.props;

export default {
  title: 'Components/Blockquote',
  render: renderTwig(blockquoteTwig),
  argTypes: {
    blockquote__quote: {
      name: 'Quote',
      control: 'text',
    },
    blockquote__attribution: {
      name: 'Attribution',
      control: 'text',
    },
    blockquote__style: {
      name: 'Style',
      control: 'select',
      options: properties.blockquote__style?.enum || [
        'bar-left',
        'bar-right',
        'quote-left',
      ],
    },
    blockquote__aria_label: {
      name: 'aria-label attribute',
      control: 'text',
    },
  },
};

export const barLeft = {
  args: {
    blockquote__quote: properties.blockquote__quote.data,
    blockquote__attribution: properties.blockquote__attribution.data,
    blockquote__style: 'bar-left',
    blockquote__aria_label: 'Block Quote with bar graphic to the left',
  },
};

export const barRight = {
  args: {
    blockquote__quote: properties.blockquote__quote.data,
    blockquote__attribution: properties.blockquote__attribution.data,
    blockquote__style: 'bar-right',
    blockquote__aria_label: 'Block Quote with bar graphic to the right',
  },
};

export const quoteLeft = {
  args: {
    blockquote__quote: properties.blockquote__quote.data,
    blockquote__attribution: properties.blockquote__attribution.data,
    blockquote__style: 'quote-left',
    blockquote__aria_label: 'Block Quote with quote icon to the left',
  },
};
