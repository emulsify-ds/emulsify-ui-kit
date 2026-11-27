export default {
  story: { inline: false, iframeHeight: '400px' },
  description: {
    component: `
## Overview

Header renders the page banner with branding, primary navigation, and optional site search.

## Anatomy & composition

Logo supplies the default branding, Main Navigation renders the links, and Search provides an optional form. Offcanvas presents the same navigation when the header becomes compact. The named slots can replace the branding or navigation, supply a search form, or replace Search altogether.

## Variants

The inline layout uses the large container breakpoint. In narrower containers, the Menu button opens a modal Offcanvas dialog. The same navigation returns inline as the header widens.

## Accessibility

Point \`header__skip_target\` to the page's main landmark and put \`tabindex="-1"\` on that landmark so it receives focus. The skip link is visible on keyboard focus. Without JavaScript, the navigation and search form remain available inline. Escape closes the modal dialog and returns focus to Menu. [Bypass blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) · [Modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Content guidelines

Give the logo descriptive alternative text and use concise navigation labels. Translate the skip, menu, and search labels for the site language.

## Drupal usage

Supply a page-unique \`header__id\` to prefix the navigation, dialog, and search IDs. Pass Drupal's menu tree as \`header__items\` and a rendered Form API form through \`header__search_form_content\` when needed. Load the Main Navigation and shared menu toggle, Offcanvas, Search, and Header behaviors through the theme.

## Theming

The header and dialog inherit the current theme. Use \`header__theme__variation\` to set light or dark. Customize the surface and separator with \`--header-background\` and \`--header-border\`.

## Changes from 1.x

Use \`header__branding_content\`, \`header__navigation_content\`, and \`header__search_content\` in place of the old slot names. Pass linked branding with the Logo props and pass navigation data in \`header__items\`. The inline and compact layouts use a single navigation instance.
`,
  },
};
