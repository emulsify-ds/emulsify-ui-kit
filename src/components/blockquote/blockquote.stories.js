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
      defaultValue: blockquoteData.pull_quote__quote,
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
      defaultValue: blockquoteData.pull_quote__attribution,
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
      defaultValue: blockquoteData.pull_quote__aria_label,
    },
  },
};

export const blockquote = ({ style, quote, attribution, ariaLabel }) => `
  ${blockquoteTwig({
    pull_quote__quote: blockquoteTwig.pull_quote__quote,
    pull_quote__attribution: blockquoteTwig.pull_quote__attribution,
    pull_quote__aria_label: 'Pull Quote with bar graphic to the left',
  })}
  ${blockquoteTwig({
    pull_quote__quote: blockquoteTwig.pull_quote__quote,
    pull_quote__style: 'bar-right',
    pull_quote__aria_label: 'Pull Quote with bar graphic to the right',
  })}
  ${blockquoteTwig({
    pull_quote__quote: blockquoteTwig.pull_quote__quote,
    pull_quote__attribution: blockquoteTwig.pull_quote__attribution,
    pull_quote__style: 'quote-left',
    pull_quote__aria_label: 'Pull Quote with quote icon to the left',
  })}
  ${blockquoteTwig({
    pull_quote__quote: quote,
    pull_quote__attribution: attribution,
    pull_quote__style: style,
    pull_quote__aria_label: ariaLabel,
  })}
`;
