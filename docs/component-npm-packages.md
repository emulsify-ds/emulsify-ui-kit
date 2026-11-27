# Component npm packages

Start with native HTML and CSS, a Drupal core library, or a small local behavior. When a package earns its place, check its maintenance, ESM support, bundle size, and compatibility with the kit's license. Review its install scripts because npm can run them on install. Check that the component still meets the accessibility baseline and keeps its content available without JavaScript.

## How installation works

The Emulsify CLI copies component source into the consumer's theme. The theme's Emulsify Core build resolves and bundles the package from the theme's `node_modules`. Declare npm packages in `npmDependencies` on the component's `system.emulsify.json` entry. Use `libraryOverrides.dependencies` in the component YAML for Drupal libraries such as `core/once`. [CLI system manifest fields](https://github.com/emulsify-ds/emulsify-cli/blob/c313ac1aed08858ef20e6d969a2253f49be74d0a/docs/systems.md#system-repository-shape)

If install directories nest, every entry whose directory contains the importing file declares the package. The CLI follows `dependency` to install other components and their packages. A component that only depends on another component has no declaration to repeat. Variant directories and files have no `npmDependencies` field.

## Add a package

1. Run `npm install '<package>@<range>'`. Use a caret range on the version you tested and save it under `dependencies`.
2. Import ESM from the component behavior, and use a bare Sass `@use` for package CSS. See the build limits below.
3. Add the same range to `npmDependencies` on the component's entry. If other entries declare a compatible range for the same package, the CLI selects the narrower range. The root `package.json` uses that exact range string.
4. Name the package in the `## Drupal usage` section of the component's `.docs.js`.
5. Run `npm run validate` and `npm run storybook-build`. Check the emitted assets and verify the component with keyboard input and with JavaScript disabled.
6. In a Drupal starter with Emulsify CLI 2.5.0 or later, install the system from your branch without `--all`. Preview the optional component with `emulsify component install <name> --dry-run`.
7. Name the package in the PR so consumers can review what the installer will add.

Installed stories, docs, and tests can use relative imports, `@emulsify/core` and its subpaths, and the packages declared by their component. Tests can also import Node built-ins. Keep suites that need additional test tools under the repo's `tests/` directory.

Keep Base and Layout runtime imports local, including Sass built-ins. The `src/util/` helpers can also import Emulsify Core. The token build is a Node script with its own development dependency setup. [Rebuild tokens in an installed theme](../README.md#rebuild-tokens-in-an-installed-theme)

## Hypothetical example

The kit ships without a slider. This example shows how a future component could use Swiper.

Add this entry to the Drupal variant's `components` in `system.emulsify.json`.

```json
{
  "name": "slider",
  "structure": "components",
  "npmDependencies": { "swiper": "^11.2.0" }
}
```

Use the same range in the root `package.json`.

```json
{
  "dependencies": { "swiper": "^11.2.0" }
}
```

Import Swiper in `slider.js`.

```js
import Swiper from 'swiper';

Drupal.behaviors.exampleSlider = {
  attach(context) {
    once('example-slider', '[data-example-slider]', context).forEach((element) => {
      new Swiper(element);
    });
  },
};
```

Load its CSS in `slider.scss`.

```scss
@use 'swiper/css';
```

Keep the slides readable in the server markup. Document Swiper in the Drupal usage section and implement the keyboard, focus, and motion behavior before offering a carousel to consumers.

## Build limits in Emulsify Core 4.5.2

The build probe with Swiper 11.2.0 produced a self-contained classic script when one component imported Swiper. With two components, both entries imported a shared ES module. Drupal's automatic SDC JavaScript attachment uses classic script attributes. An explicit `libraryOverrides` module attachment also needs a deployed chunk at the expected relative path. Core's mirroring mode moved the entries without moving the shared chunk to that relative location. The contract limits each runtime package to one importing component directory. [Drupal SDC library construction](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Theme%21ComponentPluginManager.php/function/ComponentPluginManager%3A%3AlibraryFromDefinition/11.x)

Bare `@use 'swiper/css'` put the package CSS in the component's emitted stylesheet. `@use 'pkg:swiper/css'` failed to resolve with this configuration. Importing CSS from JavaScript produced a separate stylesheet at the `dist/` root. Attach that stylesheet explicitly in Drupal if you need that form. Storybook loads the extracted stylesheet in its own build.

Inspect the consuming theme's asset paths. This kit's explicit structure configuration emits Twig and YAML under `dist/components/` and component assets under `dist/js/` and `dist/css/`. Drupal's automatic attachment discovers files beside the component metadata.

## Change or remove a package

Update the root `package.json`, lockfile, and manifest together. Remove an unused import and its declaration, and remove the package from `package.json` if nothing else uses it. Update the component docs. Adding a package to an existing component or narrowing its range changes what consumers install, so call it out in the release notes.

## Install a component that uses a package

Use Emulsify CLI 2.5.0 or later when a system contains `npmDependencies`. Older versions reject the manifest, including on component installs from a cached system. The installer needs a valid `package.json` at the project root.

| Status | Result |
| --- | --- |
| Added | The package was added to `dependencies`. |
| Already in package.json | The existing package spec satisfies the required range. |
| Needs attention | The CLI keeps the existing spec and prints a command for you to review. |

For npm, the CLI runs `npm install` once after adding missing packages. For pnpm, Yarn, or Bun, it saves the dependencies and prints the matching command for you to run. Check the package statuses with `emulsify component install <name> --dry-run`. Use `--skip-npm` with either install command to copy files and review the package command before running it. If you copy source by hand, install the declared packages and ranges in the theme root before building the assets. [CLI npm package documentation](https://github.com/emulsify-ds/emulsify-cli/blob/c313ac1aed08858ef20e6d969a2253f49be74d0a/docs/components.md#npm-packages)
