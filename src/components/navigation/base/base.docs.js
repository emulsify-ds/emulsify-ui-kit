export default {
  description: {
    component: `
## Overview

Base Menu builds a named navigation landmark from a tree of links.

## Anatomy & composition

The landmark contains a list of links and, when enabled, disclosure buttons. Use the item content slot to supply complete list items.

## Variants

The top level can be ordered or unordered. Enable either the menu toggle or submenu disclosures for nested navigation.

## Accessibility

Buttons use native Enter and Space activation. Escape closes the nearest open disclosure and returns focus to its button. Without JavaScript, the links and child lists remain visible. [WAI-ARIA Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Content guidelines

Choose a list name that helps users distinguish it from the other navigation landmarks. Use short labels and meaningful destinations.

## Drupal usage

Supply a stable, page-unique ID for each menu. Pass menu entries with title, url and below from Drupal, or use plain items with title, url and children. An item's id or key stabilizes its submenu ID when its position changes.

## Theming

Links and controls inherit the active theme. Set the local \`--base-menu-toggle-background\` to customize the toggle surface.

## Changes from 1.x

The shared menu remains available by Twig path. Its toggles use CTA, native hidden state, and stable IDs derived from the menu and item paths.
`,
  },
};
