import blockquoteTwig from './blockquote.twig';

import { props } from './blockquote.component.yml';

const blockquoteData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Blockquote',
  argTypes: {
    quote: {
      name: 'Quote',
      type: 'string',
      defaultValue: blockquoteData.blockquote__quote.data,
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
      defaultValue: blockquoteData.blockquote__attribution.data,
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
      defaultValue: 'Block Quote default value with bar graphic to the left',
    },
  },
};

export const blockquote = ({ style, quote, attribution, ariaLabel }) => `
  ${blockquoteTwig({
    blockquote__quote: blockquoteData.blockquote__quote.data,
    blockquote__attribution: blockquoteData.blockquote__attribution.data,
    blockquote__aria_label: 'Block Quote with bar graphic to the left',
  })}
  ${blockquoteTwig({
    blockquote__quote: blockquoteData.blockquote__quote.data,
    blockquote__style: 'bar-right',
    blockquote__aria_label: 'Block Quote with bar graphic to the right',
  })}
  ${blockquoteTwig({
    blockquote__quote: blockquoteData.blockquote__quote.data,
    blockquote__attribution: blockquoteData.blockquote__attribution.data,
    blockquote__style: 'quote-left',
    blockquote__aria_label: 'Block Quote with quote icon to the left',
  })}
  ${blockquoteTwig({
    blockquote__quote: quote,
    blockquote__attribution: attribution,
    blockquote__style: style,
    blockquote__aria_label: ariaLabel,
  })}
`;
