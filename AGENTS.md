# Emulsify UI Kit contributor guide

## What this is

Emulsify UI Kit is a public library of Drupal Single Directory Components with Storybook. Emulsify Core 4.5 builds it, and the Emulsify CLI installs it into Drupal themes using [the system manifest](system.emulsify.json).

## Setup and commands

Run commands from the repository root. `nvm use` selects Node 24 LTS from `.nvmrc`. The minimum version is 24.13.0. Run `npm ci` to install the locked dependencies.

| Command | Use |
| --- | --- |
| `npm run develop` | Start the asset watcher and Storybook together. |
| `npm run build` | Build Drupal components and assets with Vite. |
| `npm run storybook` | Start the Storybook development server on port 6006. |
| `npm run storybook-build` | Build Drupal assets and export static Storybook to `.out/`. |
| `npm run lint` | Run ESLint and Stylelint. |
| `npm test` | Run the Jest suite with coverage. |
| `npm run test:contract` | Check the component contract and report violations. |
| `npm run validate` | Run lint, the component contract checks, release tests, and Jest. |
| `npm run inspect:components` | Inspect components with Emulsify Core. |
| `npm run a11y` | Build Storybook and run its accessibility audit. |
| `npm run tokens:build` | Transform Figma tokens and rebuild the generated token files. |

The Tests workflow runs `npm ci` and `npm run validate` on pull requests. It runs `npm run storybook-build` and Percy when the workflow detects relevant changes. GitHub Pages runs `npm run storybook-build`. Create tokens runs `npm run tokens:build`, and Release runs `npm run test:release`. Use `npm run a11y` locally for accessibility work.

## Directory map

| Path | Purpose |
| --- | --- |
| `src/components/` | Component source, metadata, templates, styles, scripts, docs, and stories. |
| `src/foundation/` | Shared styles and utilities. Step 4 moves this to `src/base/` and changes the Twig namespace to `@base`. |
| `src/layout/` | The container, grid, and placeholder layout primitives. Include these by path. |
| `src/tokens/` | Figma token inputs, build scripts, and token stories. |
| `src/util/` | Storybook helpers. Keep these outside the Drupal asset build. |
| `assets/` | Fonts, icons, images, audio, and video. |
| `config/` | Emulsify Core, Figma, Jest, and token build configuration. |
| `tests/` | Repository-wide contract and release checks. |
| `docs/` | The [2.0 roadmap](docs/2.0/roadmap.md) and [migration guide](docs/migration-2.0.md). |

Edit source files and regenerate output with the appropriate build. Leave `components/`, `dist/`, `.out/`, and generated token files such as `src/tokens/transformed.tokens.json` and `src/tokens/tokens.scss` untouched by hand.

## Component contract

| Area | Rule |
| --- | --- |
| Files | A directory under `src/components/` with a `*.component.yml` is a component. Name `<name>.component.yml`, `<name>.twig`, `<name>.docs.js`, and `<name>.stories.js` after that directory. `<name>.scss`, `<name>.js`, `<name>.test.js`, and `_partials` are optional. Step 6 adds checks for `src/layout/<name>/<name>.yml`. |
| Schema | Set `$schema` to `https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json`. Set `name`, `description`, `group`, and `status`. Give every prop `type`, `title`, and `description`. Provide `examples`, `default`, or `enum` for each prop except `*__blockname`, `*__modifiers`, `*__additional_classes`, and `*__attributes`. Omit `data:` keys. Use distinct prop and slot names and declare a prop for each entry in `required`. |
| Twig | Start with a `{# … #}` doc comment that names every prop and slot. Use stable IDs and omit `random()`. |
| Stories | Include the `autodocs` tag and set `parameters.docs` from the sibling `.docs.js` module. Write stories without JSX. |
| Docs | Use this heading order. `## Overview`, `## Anatomy & composition`, `## Variants`, `## Accessibility`, `## Content guidelines`, `## Drupal usage`, `## Theming`, `## Changes from 1.x`. Keep Twig imports out of `.docs.js`. |
| Behavior JS | Call `once()` for JavaScript outside stories, docs, and tests. Use Drupal-provided or local code and omit npm package imports. |
| SCSS | Use color roles and omit hex colors and 1.x token custom properties. |
| Global | Each `*.component.yml` has a unique basename. `system.emulsify.json` lists exactly the component directories and names only dependencies that exist. |

List enforced components in `tests/contract-allowlist.json` by path relative to `src/components/`, for example `typography/heading`. Violations fail the contract test for those components. The test reports warnings for the other components. Global violations are warnings until step 15 enables `enforceGlobal`.

## Refining a component

1. Bring its component YAML, Twig, SCSS, JavaScript, docs, and stories up to the contract.
2. Check accessibility against the baseline below and fix failures.
3. Add a Jest test for any logic.
4. Replace button and link includes with `cta`.
5. If it is a section, forward the container props using the shared contract below.
6. Add the component to `tests/contract-allowlist.json` once it passes the contract.
7. Update `system.emulsify.json` and [the migration guide](docs/migration-2.0.md) for the change.
8. Make one commit per component.

## Twig conventions

- Build classes and attribute objects with `bem()` and `add_attributes()`.
- Prefix props with the block name in `snake_case`.
- Express variants with data attributes and keep the markup structure consistent across variants.
- Derive IDs from a stable prop. Avoid `random()`.
- Include siblings by path as `@components/<name>/<name>.twig` with `with_context: false`. The SDC ID prefix is the consuming theme's machine name.
- Name slots `<block>__<thing>_content` and keep their names distinct from props.

## Shared prop contracts

| Props or slot | Use |
| --- | --- |
| `<block>__ctas` | Render up to two `{ content, url, icon?, icon_position? }` items with `cta`. |
| `<block>__image__*` | Forward these props to `image`. |
| `<block>__media_content` | Provide this slot for composed media. |
| `__width`, `__theme`, `__theme__variation`, `__bg_color`, `__spacing`, `__id`, `__container__modifiers` | Prefix each with the block name and forward through the shared container contract. |
| `__blockname`, `__modifiers`, `__additional_classes`, `__attributes` | Prefix each with the block name for class and attribute customization. |
| `__heading`, `__heading_level` | Prefix each with the block name. Support heading levels 2–6. |

## Styling

- For 2.0 component styles, load the shared Sass API with `@use '../../base' as *;`.
- Set colors with `var(--clr-*)` and use `color-mix()` for alpha. Avoid hex and 1.x token names.
- Use `space()` for spacing with pixel keys from its scale. Avoid off-scale pixel values.
- Use `breakpoint()` for responsive rules.

### Base API

Steps 4 and 5 fill in the Base API reference.

## Traps

- An embed with `only` or `with_context: false` triggers Drupal to revalidate the outer component. Forward every required outer prop into the embed, even if the child ignores it.
- The Twig `default` filter replaces `false`. For booleans that default to `true`, use `x is defined and x is not same as(null) ? x : true`.
- Storybook's Twig.js drops a block declared inside another template's block. Render the child into a variable first.
- Use `*.stories.js`, `*.docs.js`, `*.component.js`, `*.min.js`, or `*.test.js` for component files that stay out of the Vite JavaScript build. Treat other component `.js` files as Drupal assets. A leading underscore excludes SCSS partials only.
- `add_attributes()` drops `NULL`, `''`, and `[]` in Drupal. Storybook retains those values.
- Drupal validates props, applies component YAML defaults, and passes `NULL` for empty fields. Storybook skips validation and default application. Type optional props as nullable and normalize them before passing them to strictly typed children.
- Restart Storybook after adding a component because it discovers CSS at startup.
- `breakpoint()` emits `@container` queries. Give the component an ancestor with `container-type` because queries never match the element that establishes the container. Pass `$media: true` for viewport rules.

## Accessibility baseline

Meet WCAG 2.2 AA and follow the WAI-ARIA Authoring Practices for interactive patterns. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

- Provide a visible focus indicator with at least 3:1 contrast.
- Put motion behind `prefers-reduced-motion`.
- Size interactive targets to at least 24 × 24 CSS pixels.
- Keep content readable without JavaScript.

## Git

Use Conventional Commits. Husky runs `lint-staged` and `commitlint`. Keep hooks enabled and never use `--no-verify`.
