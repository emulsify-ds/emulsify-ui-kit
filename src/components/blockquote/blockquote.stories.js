import blockquoteTwig from './blockquote.twig';

import blockquoteData from './blockquote.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Blockquote',
  argTypes: {
    quote: {
      name: 'Quote',
      type: 'string',
      defaultValue: blockquoteData.block_quote__quote,
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
      defaultValue: blockquoteData.block_quote__attribution,
    },
    style: {
      name: 'Style',
      options: ['bar-left', 'bar-right', 'quote-left'],
      type: 'select',
      defaultValue: 'bar-left',
    },
    ariaLabel: {
      name: 'aria-label attribute',
      type: 'string',
      defaultValue: blockquoteData.block_quote__aria_label,
    },
  },
};

export const blockquote = ({ style, quote, attribution, ariaLabel }) => `
  ${blockquoteTwig({
    block_quote__quote: blockquoteData.block_quote__quote,
    block_quote__attribution: blockquoteData.block_quote__attribution,
    block_quote__aria_label: 'Block Quote with bar graphic to the left',
  })}
  ${blockquoteTwig({
    block_quote__quote: blockquoteData.block_quote__quote,
    block_quote__style: 'bar-right',
    block_quote__aria_label: 'Block Quote with bar graphic to the right',
  })}
  ${blockquoteTwig({
    block_quote__quote: blockquoteData.block_quote__quote,
    block_quote__attribution: blockquoteData.block_quote__attribution,
    block_quote__style: 'quote-left',
    block_quote__aria_label: 'Block Quote with quote icon to the left',
  })}
  ${blockquoteTwig({
    block_quote__quote: quote,
    block_quote__attribution: attribution,
    block_quote__style: style,
    block_quote__aria_label: ariaLabel,
  })}
`;
