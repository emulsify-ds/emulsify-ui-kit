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
| `npm run test:sass` | Run Sass True assertions and check Sass compilation errors. |
| `npm run validate` | Run lint, component contract checks, release tests, Sass tests, and Jest. |
| `npm run inspect:components` | Inspect components with Emulsify Core. |
| `npm run a11y` | Build Storybook and run its accessibility audit. |
| `npm run tokens:build` | Transform Figma tokens and rebuild the generated token files. |

The Tests workflow runs `npm ci` and `npm run validate` on pull requests. It runs `npm run storybook-build` and Percy when the workflow detects relevant changes. GitHub Pages runs `npm run storybook-build`. Create tokens runs `npm run tokens:build`, and Release runs `npm run test:release`. Use `npm run a11y` locally for accessibility work.

## Directory map

| Path | Purpose |
| --- | --- |
| `src/components/` | Component source, metadata, templates, styles, scripts, docs, and stories. |
| `src/base/` | Shared styles, Sass utilities, generated tokens, and Base stories. The Twig namespace is `@base`. |
| `src/layout/` | The container, grid, and placeholder layout primitives. Include these by path. |
| `src/tokens/` | Tokens Studio source and token build script. |
| `src/util/` | Storybook helpers. Keep these outside the Drupal asset build. |
| `src/storybook/` | Welcome, guides, and examples. The `examples` implementation provides the `@examples` Twig namespace. |
| `assets/` | Fonts, icons, images, audio, and video. |
| `config/` | Emulsify Core, Figma, Jest, and token build configuration. |
| `tests/` | Repository-wide contract and release checks. |
| `docs/` | The [2.0 roadmap](docs/2.0/roadmap.md) and [migration guide](docs/migration-2.0.md). |

Edit source files and regenerate output with the appropriate build. Leave `components/` and the generated `dist/` and `.out/` directories untouched by hand. Edit `src/tokens/figma.tokens.json` and run `npm run tokens:build` to update `_maps.scss`, `_custom-properties.scss`, and `tokens.json` in `src/base/tokens/`.

## Component contract

| Area | Rule |
| --- | --- |
| Files | A directory under `src/components/` with a `*.component.yml` is a component. Name `<name>.component.yml`, `<name>.twig`, `<name>.docs.js`, and `<name>.stories.js` after that directory. The layout primitives follow the same contract with `<name>.yml` in `src/layout/<name>/`. `<name>.scss`, `<name>.js`, `<name>.test.js`, and `_partials` are optional. |
| Schema | Set `$schema` to `https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json`. Set `name`, `description`, `group`, and `status`. Give every prop `type`, `title`, and `description`. Provide `examples`, `default`, or `enum` for each prop except `*__blockname`, `*__modifiers`, `*__additional_classes`, and `*__attributes`. Omit `data:` keys. Use distinct prop and slot names and declare a prop for each entry in `required`. |
| Twig | Start with a `{# … #}` doc comment that names every prop and slot. Use stable IDs and omit `random()`. |
| Stories | Include the `autodocs` tag and set `parameters.docs` from the sibling `.docs.js` module. Write stories without JSX. |
| Docs | Use this heading order. `## Overview`, `## Anatomy & composition`, `## Variants`, `## Accessibility`, `## Content guidelines`, `## Drupal usage`, `## Theming`, `## Changes from 1.x`. Keep Twig imports out of `.docs.js`. |
| Behavior JS | Call `once()` for JavaScript outside stories, docs, and tests. Declare each npm import in `npmDependencies` on every manifest entry whose install directory contains the file. |
| SCSS | Use color roles and omit hex colors and 1.x token custom properties. Declare package imports using the same rules as behavior JavaScript. |
| Global | Each `*.component.yml` has a unique basename. `system.emulsify.json` lists exactly the component directories and names only dependencies that exist. |

`npm run test:contract` enforces every component and layout contract, including global metadata and manifest checks. The fixture at `tests/fixtures/1x-token-names.json` preserves the removed property names for the SCSS check.

## Refining a component

1. Bring its component YAML, Twig, SCSS, JavaScript, docs, and stories up to the contract.
2. Check accessibility against the baseline below and fix failures.
3. Add a Jest test for any logic. Keep tests that need repository-only tools under `tests/components/` or `tests/layout/`.
4. Replace button and link includes with `cta`.
5. If it is a section, forward the container props using the shared contract below.
6. If it needs an npm package, follow [the component npm package guide](docs/component-npm-packages.md).
7. Update `system.emulsify.json` and [the migration guide](docs/migration-2.0.md) for the change.
8. Run `npm run test:contract` and make one commit per component.

## Components with npm packages

- Declare packages on component entries and match the effective range in the root `package.json` dependencies. Name each package in the component's Drupal usage documentation. The contract limits a runtime package to one importing component directory.
- Installed stories, docs, and tests can import local files, Emulsify Core, and packages their component declares. Tests can also import Node built-ins. Keep Base and Layout runtime imports local. Shared helpers can import Emulsify Core.
- Follow the installation, review, and build instructions in the [component npm package guide](docs/component-npm-packages.md).

## Storybook conventions

- Use the sidebar groups Welcome, Guides, Base, Layout, Components, and Examples in that order. Place component stories under `Components/<Component>` and token stories under `Base/<Topic>`.
- Build Base token previews from `src/base/tokens/tokens.json` and use the copy controls in `src/util/_copy-usage.twig` for token examples.
- Use `tags: ['autodocs']` and source `parameters.docs` from the sibling `.docs.js` file. Put standalone MDX pages under `src/storybook/` and prefix their stylesheets with `sb-` for Storybook-only output.
- Use `argsFromSchema(component.props)` from `src/util/argsFromSchema.js` to seed args from each prop's first example or default. Merge the `args` and `argTypes` from `createContainerWidthControls()` and `createContainerThemeControls()` in `src/util/storybookContainerControls.js` when the story needs appearance controls.
- Wrap Twig rendering with `withStorybookContainer()` from `src/util/storybookContainer.js`. Use `renderTwig()` with its default context and map story args inside the wrapper's callback so width and theme reach it.

```js
render: renderTwig(
  withStorybookContainer((args) =>
    exampleTwig({ ...args, example__label: args.label }),
  ),
),
```

- The preview loads `once()` for Drupal behaviors and the copy helper for Base token stories. A native button with `class="js-copy-trigger"` and `data-usage` containing the code snippet enables copying and status feedback.

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
| `<block>__ctas` | Render up to two `{ content, url, icon?, icon_position? }` items with `cta`. Map `content` to `cta__text` and forward the other item keys to their `cta__*` props. |
| `<block>__image__*` | Forward these props to `image`. |
| `<block>__media_content` | Provide this slot for composed media. |
| `__width`, `__theme`, `__theme__variation`, `__bg_color`, `__spacing`, `__id`, `__container__modifiers` | Prefix each with the block name and forward through the shared container contract. |
| `__blockname`, `__modifiers`, `__additional_classes`, `__attributes` | Prefix each with the block name for class and attribute customization. |
| `__heading`, `__heading_level` | Prefix each with the block name. Support heading levels 2–6. |

Embed `@layout/container/container.twig` for sections and forward the shared props to the corresponding `container__*` keys. `__container__modifiers` maps to `container__modifiers`. Use `narrow`, `content`, `wide`, or `full` for width. Set vertical spacing through `container__spacing` and keep modifiers for component-specific classes. Put the composed markup in `container__content`. For repeated items with equal or focused columns, embed `@layout/grid/grid.twig` and render the direct grid items in `grid__content`.

Include `@components/cta/cta.twig` for calls to action. Use an anchor for navigation, a button for actions, and a span for a presentational label inside a linked composite. Use a plain anchor for text links. The Base stylesheet provides their color, underline, and focus styles.

## Styling

- For 2.0 component styles, load the shared Sass API with `@use '../../base' as *;`.
- Set colors with `var(--clr-*)` and use `color-mix()` for alpha. Avoid hex and 1.x token names.
- Use `space()` for spacing with pixel keys from its scale. Avoid off-scale pixel values.
- Use `breakpoint()` for responsive rules.

### Base API

Import the API with `@use '../../base' as *;`, adjusting the relative path for nested components. Load `src/base/base.scss` as the global stylesheet to provide the token properties. Set `data-component-theme="default light"` or `data-component-theme="default dark"` on the theme's wrapper.

The global stylesheet establishes a root query container for standalone components. Add `container-type: inline-size` to a closer wrapper when a component should respond to that wrapper's width.

| API | Use |
| --- | --- |
| `space($px)` | Use the unitless keys 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, and 120. The function returns `var(--space-N, <rem>)` and raises a Sass error for an off-scale key. |
| `breakpoint($breakpoint, $media: false)` | Use `sm` 360, `md` 768, `lg` 1024, `xl` 1280, or `xxl` 1440. The `md-down`, `lg-down`, and `xl-down` queries cap width 0.05rem below their named cutoff. Use `$media: true` for viewport queries. Unknown names raise a Sass error. |
| `font-size($key)`, `font-family($key)`, `font-weight($key)`, `line-height($key)`, `letter-spacing($key)` | Use the keys from the generated maps. Each function returns the relevant custom property with a resolved fallback. |
| `fluid-type($min-px, $max-px)` | Return a clamped size between two pixel values, interpolating from the `sm` to the `xl` viewport width. |
| `typography($style)` | Emit the resolved declarations for a typography style from `$typography`. Set the color separately with a color role. |
| `link-underline` | Apply the Base underline and its motion-safe hover and focus treatment to a custom link style. |
| `grid-tracks($tracks: 12)` | Set up a one-column grid that expands at the `md` container breakpoint, with a `--grid-spacing` gutter that falls back to `space(40)`. |
| `grid-column($span, $start: auto, $from: 'md')` | Place an item on the tracks at the selected container breakpoint. Use `$from: none` for unconditional placement. |
| `str-replace($string, $search, $replace: '')` | Replace all occurrences of a substring. |
| `safe-map-get($map, $key, $label: 'value', $fn-name: 'safe-map-get')` | Look up a Sass map entry and raise a Sass error for a missing key or invalid map. |
| `focus`, `focus-styles`, `visually-hidden` | Apply the shared focus treatment, reuse its outline declarations, or hide content visually while keeping it available to assistive technology. |
| `motion-safe`, `transition($properties, $duration: 0.3s, $delay: 0ms, $allow-discrete: false)` | Apply motion only when the user expresses no reduced-motion preference. |

The generated token maps supply spacing, breakpoints, and typography. The global focus treatment uses `--clr-focus`. The container and grid both establish query containers on their outer and inner wrappers. Use the Base/Placement guide for an example of scoped 12-track placement inside a section.

## Traps

- An embed with `only` or `with_context: false` triggers Drupal to revalidate the outer component. Forward every required outer prop into the embed, even if the child ignores it.
- The Twig `default` filter replaces `false`. For booleans that default to `true`, use `x is defined and x is not same as(null) ? x : true`.
- Storybook's Twig.js drops a block declared inside another template's block. Render the child into a variable first.
- Use `*.stories.js`, `*.docs.js`, `*.component.js`, `*.min.js`, or `*.test.js` for component files that stay out of the Vite JavaScript build. Treat other component `.js` files as Drupal assets. A leading underscore excludes SCSS partials only.
- `add_attributes()` drops `NULL`, `''`, and `[]` in Drupal. Storybook retains those values.
- Drupal validates props, applies component YAML defaults, and passes `NULL` for empty fields. Storybook skips validation and default application. Type optional props as nullable and normalize them before passing them to strictly typed children.
- Restart Storybook after adding a component because it discovers CSS at startup.
- `breakpoint()` emits `@container` queries. Give the component an ancestor with `container-type` because queries never match the element that establishes the container. Pass `$media: true` for viewport rules.
- The first `npmDependencies` entry requires Emulsify CLI 2.5.0 or later everywhere this system is installed.

## Accessibility baseline

Meet WCAG 2.2 AA and follow the WAI-ARIA Authoring Practices for interactive patterns. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

- Provide a visible focus indicator with at least 3:1 contrast.
- Put motion behind `prefers-reduced-motion`.
- Size interactive targets to at least 24 × 24 CSS pixels.
- Keep content readable without JavaScript.

## Git

Use Conventional Commits. Husky runs `lint-staged` and `commitlint`. Keep hooks enabled and never use `--no-verify`.
