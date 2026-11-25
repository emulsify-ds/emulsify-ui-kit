const description = `
## Overview

Grid arranges related items such as teasers or cards in responsive rows.

## Anatomy & composition

The wrapper establishes a query container. The inner grid contains one item
per track and also acts as a query container for descendants. Heading, prefix,
and suffix blocks sit outside the tracks. Use the content block for items.

## Variants

The columns prop sets a ceiling between one and six. Grid stacks below
\`md\` (768 px), shows up to two columns at \`md\`, up to four at \`lg\`
(1024 px), and reaches its ceiling at \`xl\` (1280 px).

Focus gives one column twice the width of the other columns when the grid
reaches its ceiling. An unavailable focus position falls back to equal tracks.

Final row alignment moves an incomplete row as a group. Last item alignment
can place the last item on a separate row and align it within that row.

## Accessibility

Keep items in reading order in the source. The grid keeps that order at every
size. Use a descriptive heading when the collection starts a new section.

## Content guidelines

Group items with a shared purpose and similar amounts of content. Use a
separate last row for an action that applies to the whole collection. Use the
Base placement mixins when arranging parts of one component.

## Drupal usage

Embed \`@layout/grid/grid.twig\` and fill \`grid__content\` with the rendered
item templates. Each item should be a direct child of the inner grid.

## Theming

Spacing defaults to \`one\` (40 px). The gap choices are \`none\`, \`quarter\`,
\`half\`, \`one\`, \`two\`, \`three\`, and \`four\`. Scope \`--grid-spacing\` on a
grid or its ancestor to override the gap.

## Changes from 1.x

Use the spacing names without the \`-spacing\` suffix. Set final row and last
item alignment with the grid props. The heading, prefix, and suffix are
outside the CSS Grid tracks. Set wrapper and inner attributes independently.
`;

export default {
  description: { component: description },
  source: {
    language: 'twig',
    code: `{% embed '@layout/grid/grid.twig' with {
  grid__columns: 3,
  grid__spacing: 'one',
  grid__alignment: 'center',
} %}
  {% block grid__content %}
    {{ items }}
  {% endblock %}
{% endembed %}`,
  },
};
