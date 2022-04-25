![4K-CI-style badge](https://user-images.githubusercontent.com/409903/165123883-03452ea9-76ec-4319-9d82-b2dcba785d2b.svg)

# UI Kit Vision

The Four Kitchens UI Kit is a tool for designers and front-end engineers to build high-quality user interfaces effectively and efficiently while maintaining WCAG 2.1 AA standards and project performance goals.

The Four Kitchens UI Kit gives users access to a library of prebuilt tokens and components that follow accessibility best practices and are easy to customize. The components in the kit are fully responsive, carefully designed, and can be implemented for modification for every project.

The goals of the Four Kitchens UI Kit are to:

- Create efficiency in the user interface design process
- Establish consistency in user interface design
- Maintain high accessibility standards

The Four Kitchens UI Kit has two distinct building blocks: the Figma and the code repo. These two items are kept in alignment for a seamless experience.

The Creative Team uses the Four Kitchens UI Kit for every design project, modifying it to create great user interfaces. When a new component is made for a project, that new component is added back into the kit for future reuse. Tokens are managed in Figma and shared with the code repo.

The Frontend Engineering team uses the Four Kitchens UI Kit for every project. With tokens synced from Figma and a comprehensive component library, the Frontend team focuses their energy on building custom interfaces, streamlining performance, etc.

What the Four Kitchens UI Kit is not:

- Handcuffs. If using the kit is a barrier to a successful project, do what you need to for your project to be successful and provide feedback on why the kit was a barrier.
- A "default" visual design. Our visual design work is tailor-made for each of our clients and projects.

## Components of this UI Kit

- [Figma UI Kit](https://www.figma.com/file/eo87m50yAw3P8iXTypxw4I/Four-Kitchens-UI-Kit?node-id=22073%3A26)
- [Storybook](https://four-kitchens-ui-kit.netlify.app/?path=/story/docs-cover--cover)

## Connecting Components with Figma

The strength of this UI kit leans on its connection with Figma.

1. In Figma, a series of design tokens for a component are defined and exported to this project as `./src/tokens/figma.tokens.json`.
2. These tokens are transformed into standard [Amazon Style Dictionary](https://amzn.github.io/style-dictionary/#/) syntax.
3. These new tokens, `./src/tokens/sd.tokens.json` is converted into the preferred CSS format.

### Example

The [button component](https://four-kitchens-ui-kit.netlify.app/?path=/story/components-button--button) serves as an example of how variables are used to connect Figma with the code.

```css
.button {
  background-color: var(--button-color-bkg);
  padding: var(--button-padding-y) var(--button-padding-x);
  color: var(--button-color-label);
  border-radius: var(--button-radius);
  border: var(--button-border-width-border) solid var(--button-border-color);
  font-size: var(--font-size-small);
  font-weight: var(--button-font-weight-label);
  text-transform: var(--button-text-case);
  text-decoration: none;

  &:hover,
  &.button--hover {
    background-color: var(--button-color-bkg-hover);
    padding: var(--button-padding-y-hover) var(--button-padding-x-hover);
    border: var(--button-border-width-border-hover) solid var(
        --button-border-color-hover
      );
    color: var(--button-color-label-hover);
    text-decoration: underline;
    text-transform: var(--button-text-case);
  }

  &:focus,
  &.button--focus {
    padding: var(--button-padding-y-focus) var(--button-padding-x-focus);
    color: var(--button-color-label-focus);
    border: var(--button-border-width-border-focus) solid var(
        --button-border-color-focus
      );
    outline: var(--button-border-width-outline-focus) solid var(
        --button-color-outline-focus
      );
    text-transform: var(--button-text-case);
  }
}
```
