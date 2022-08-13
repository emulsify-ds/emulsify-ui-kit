[![Emulsify Design System](https://user-images.githubusercontent.com/409903/170579210-327abcdd-2c98-4922-87bb-36446a4cc013.svg)](https://www.emulsify.info/)
![4K-CI-style badge](https://user-images.githubusercontent.com/409903/165123883-03452ea9-76ec-4319-9d82-b2dcba785d2b.svg)

# UI kit vision

The Four Kitchens UI Kit is a tool for designers and front-end engineers to build high-quality user interfaces effectively and efficiently while maintaining WCAG 2.1 AA standards and project performance goals.

The Four Kitchens UI Kit gives users access to a library of prebuilt tokens and components that follow accessibility best practices and are easy to customize. The components in the kit are fully responsive, carefully designed, and can be implemented for modification in every project.

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

## There are two parts of this UI Kit

- [Figma UI Kit](https://www.figma.com/file/eo87m50yAw3P8iXTypxw4I/Four-Kitchens-UI-Kit?node-id=22073%3A26)
- [Storybook](https://four-kitchens-ui-kit.netlify.app/?path=/story/docs-cover--cover)

## Connecting components with Figma

The strength of this UI kit leans on its connection with Figma.

1. In Figma, a series of design tokens for a component are defined and exported to this project as `./src/tokens/figma.tokens.json`.
2. These tokens are transformed into standard [Amazon Style Dictionary](https://amzn.github.io/style-dictionary/#/) syntax.
3. These new tokens are converted into the preferred CSS format from the `./src/tokens/sd.tokens.json` file.

### Example component

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

## Creating a component

A complete component meets the following criteria:

1. Design tokens are defined as their own set in Figma, in the Figma Tokens plugin, and they use references to values defined in `global` as much as possible.
2. The component has an independent frame in Figma.
3. The component's CSS file uses the generated design tokens as much as possible. See button example above.
4. A component's story connects to the corresponding Figma frame, defined in `.storybook/configma.json`.
5. A component passes WCAG 2 AA.

### Defining design tokens as their own set in Figma

https://user-images.githubusercontent.com/409903/165324471-6c16eee2-0fa2-461f-9f84-42b5862658d2.mp4

### Connecting a component's story to the corresponding Figma frame

1. In Figma, select the frame to share and activate the Share button (in the upper right hand corner).
2. In the share modal make sure that "Link to selected frame" is checked and activate "Copy link".
3. Open `.storybook/configma.json` and confirm the following:
4. Using this example: `https://www.figma.com/file/[FIGMA_FILE_ID]/[FIGMA_FILE_NAME]?node-id=[NODE_ID]`
5. Confirm that `url` has the correct `FIGMA_FILE_ID` and `FIGMA_FILE_NAME`.
6. Add your component name to the file as a key with the `NODE_ID` being the value.
7. Import `configma.json` into your story.

8. In the parameters of your story, include `figma.COMPONENT_KEY` as shown below.

```js
Button.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.button,
  },
};
```

## Contributing to this UI Kit

We implement [Four Kitchens' linting and formatting standards](https://github.com/fourkitchens/eslint-config-and-other-formatting) on this project. The configuration for the various linting tools are installed via NPM, and because it's published as a GitHub package, you must create a Personal Access Token and save it as an environment variable locally to be able to successfully run `npm install`.

Follow the steps in the "Prerequisites" section of the [Installation docs](https://github.com/fourkitchens/eslint-config-and-other-formatting#installation) to create your own. (Be sure to follow the link to stack overflow so that you can set your variable to persist across terminal instances!)

### Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/amazingrando>
            <img src=https://avatars.githubusercontent.com/u/409903?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Randy Oest/>
            <br />
            <sub style="font-size:14px"><b>Randy Oest</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ModulesUnraveled>
            <img src=https://avatars.githubusercontent.com/u/1663810?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Brian Lewis/>
            <br />
            <sub style="font-size:14px"><b>Brian Lewis</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ryanhagerty>
            <img src=https://avatars.githubusercontent.com/u/8405274?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Ryan Hagerty/>
            <br />
            <sub style="font-size:14px"><b>Ryan Hagerty</b></sub>
        </a>
    </td>
</tr>
</table>
