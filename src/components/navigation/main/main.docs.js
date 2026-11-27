export default {
  description: {
    component: `
## Overview

Main Menu presents the primary destinations in a named navigation landmark.

## Anatomy & composition

The navigation is a list of links. A parent with a destination keeps its link and has a separate submenu button. A parent without a destination displays its label in the submenu button.

## Variants

The menu measures its inline links against its available width. When the links cannot fit, it switches to a compact layout behind a Menu button.

## Accessibility

Enter and Space activate the focused disclosure. Tab and Shift+Tab move through links and controls in document order. Escape closes the nearest open submenu and returns focus to its button. Links and child lists remain visible before behavior attachment. [WAI-ARIA Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Content guidelines

Choose short names that describe the destinations. Give each top-level category a distinct label.

## Drupal usage

Pass a unique \`main__id\` when rendering multiple instances and set \`main__items\` to the Drupal menu tree or a list of plain items. Supply an id or key for each item to keep its submenu ID stable when items are reordered. Include the shared menu toggle and main menu behaviors.

## Theming

The menu inherits the active theme. Use \`--main-nav-panel-background\` to set the inline submenu surface.

## Changes from 1.x

Use \`main__items\` in new templates. The legacy items alias still accepts an existing menu tree. Main Menu responds to its available width. Submenus open with disclosure buttons.
`,
  },
};
