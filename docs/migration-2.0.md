# Emulsify UI Kit 1.x → 2.0 migration guide

## Requirements

Use Node.js 24.13.0 or newer.

## Paths and namespaces

### Storybook

Replace JSX decorators in `.stories.js` with Twig render callbacks. For themed previews, pass a `withStorybookContainer()` callback to `renderTwig()`, and map component args inside that callback. See the [Storybook conventions](../AGENTS.md#storybook-conventions).

Move custom Welcome pages and examples from `src/components/docs/` to `src/storybook/`. Use the project's `examples` structure implementation and `@examples` Twig namespace for shared example templates. Example styles now build under `dist/storybook/`.

Update bookmarks, embeds, and other links to renamed Storybook entries.

| Previous entry ID or prefix | New entry ID or prefix |
| --- | --- |
| `docs-cover--cover` | `welcome--docs` |
| `pages-basic--basic` | `examples-basic--basic` |
| `pages-home--home` | `examples-home--home` |
| `tokens-*` | `base-*` |
| `component-search--*` | `components-search--*` |
| `components-cards--*` | `components-card--*` |
| `components-headers-page-title--*` | `components-page-title--*` |
| `components-media-*` | `components-*` |

## Tokens

## Breakpoints

## Layout

## Components

## Removed
