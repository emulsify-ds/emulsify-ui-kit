export default {
  description: {
    component: `
## Overview

A CTA presents a named action or destination with an optional decorative icon.

## Anatomy & composition

Use \`cta__text\` for the label or fill the \`cta__content\` slot with custom label markup. Pass an icon name in \`cta__icon\` and set \`cta__icon_position\` to \`left\` or \`right\`.

## Variants

Set \`cta__modifiers\` to \`['primary']\` for the main filled action, \`['secondary']\` for an outlined supporting action, \`['link']\` for an underlined action, or \`['clean']\` for an unfilled action with an underline on hover and keyboard focus. Use the element that matches the behavior. An anchor goes to a URL, a button performs an action, and a span provides a non-interactive label.

## Accessibility

Give each CTA a descriptive label. A button uses \`type="button"\` by default. Pass \`cta__button_type\` as \`submit\` or \`reset\` when you intend to submit or reset a form. When \`cta__new_tab\` opens a link in a new tab, the accessible name includes “(opens in a new tab)” and the link protects the opener. Focus indicators and target sizes apply in both theme variations.

## Content guidelines

Use a short label that names the action or destination, such as “View event details”. Use a primary CTA for the main next step and secondary CTAs for supporting actions. Use regular anchors in body copy.

## Drupal usage

Include the template by path with an isolated context. Pass \`cta__text\` and \`cta__url\`, or pass a Drupal link render array as \`cta__link\`. Keep interactive elements outside the label slot.

\`\`\`twig
{{ include('@components/cta/cta.twig', {
  cta__text: 'View event details'|t,
  cta__url: event_url,
  cta__modifiers: ['primary'],
}, with_context: false) }}
\`\`\`

## Theming

CTA inherits colors from its surrounding \`data-component-theme\`. To customize a particular instance, scope \`--cta-color\`, \`--cta-background-color\`, \`--cta-color-hover\`, and \`--cta-background-color-hover\` on that instance or on its wrapper. Check text, border, and focus contrast after changing these properties.

## Changes from 1.x

CTA replaces Button and styled Link. Move the old content and destination into \`cta__text\` and \`cta__url\`, and move the visual style into \`cta__modifiers\`. Pass standard form button types through \`cta__button_type\`. Plain anchors use the global Base link styles.
`,
  },
};
