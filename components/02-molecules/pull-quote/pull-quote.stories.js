import pullQuoteTwig from './pull-quote.twig';

import pullQuoteData from './pull-quote.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Pull Quote',
  argTypes: {
    quote: {
      name: 'Quote',
      type: 'string',
      defaultValue: pullQuoteData.pull_quote__quote,
    },
    attribution: {
      name: 'Attribution',
      type: 'string',
      defaultValue: pullQuoteData.pull_quote__attribution,
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
      defaultValue: pullQuoteData.pull_quote__aria_label,
    },
  },
};

export const pullQuote = ({ style, quote, attribution, ariaLabel }) => `
  ${pullQuoteTwig({
    pull_quote__quote: pullQuoteData.pull_quote__quote,
    pull_quote__attribution: pullQuoteData.pull_quote__attribution,
    pull_quote__aria_label: 'Pull Quote with bar graphic to the left',
  })}
  ${pullQuoteTwig({
    pull_quote__quote: pullQuoteData.pull_quote__quote,
    pull_quote__style: 'bar-right',
    pull_quote__aria_label: 'Pull Quote with bar graphic to the right',
  })}
  ${pullQuoteTwig({
    pull_quote__quote: pullQuoteData.pull_quote__quote,
    pull_quote__attribution: pullQuoteData.pull_quote__attribution,
    pull_quote__style: 'quote-left',
    pull_quote__aria_label: 'Pull Quote with quote icon to the left',
  })}
  <div>
    <h2>Playground</h2>
    <p>Use the StoryBook controls to see the pull-quote below implement the available variations and colors.</p>
    ${pullQuoteTwig({
      pull_quote__quote: quote,
      pull_quote__attribution: attribution,
      pull_quote__style: style,
      pull_quote__aria_label: ariaLabel,
    })}
  </div>
`;
