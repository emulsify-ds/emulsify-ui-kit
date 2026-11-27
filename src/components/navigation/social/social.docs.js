export default {
  description: {
    component: `
## Overview

Social Navigation links to an organization's social media profiles.

## Anatomy & composition

A named navigation landmark contains a list of links. Each link combines a decorative icon with its text label.

## Variants

Set the landmark label to distinguish separate groups. The item title stays visible when an icon is unavailable.

## Accessibility

Each icon is decorative. Visually hidden link text provides the accessible name when an icon is present. Focus indicators follow the active theme.

## Content guidelines

Name links for the profiles they open. Use a short, specific name for the group.

## Drupal usage

Pass \`social__items\` with a title and URL for each link. Supply an icon name when one is available. Use \`social__items_content\` for custom list items.

## Theming

Social Navigation inherits the active theme's link, background, and focus roles.

## Changes from 1.x

Move menu data to \`social__items\` and wrapper modifiers to \`social__modifiers\`. Replace the shared menu's list block with \`social__items_content\`. The component retains its \`social-nav\` class.
`,
  },
};
