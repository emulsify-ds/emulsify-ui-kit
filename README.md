[![Emulsify Design System](https://user-images.githubusercontent.com/409903/170579210-327abcdd-2c98-4922-87bb-36446a4cc013.svg)](https://www.emulsify.info/)

## Compound

<blockquote>Noun: A thing that is composed of two or more separate elements</blockquote>

Compound is the default Emulsify system of components.

[View the deployed storybook instance here](https://emulsify-ds.github.io/compound)

## Development

- Ensure you're using the correct node/npm version `nvm use`
- Install dependencies `npm install`
- Run the develop script `npm run develop`

That should spin up a local server (typically at `http://localhost:6006`) that you can open in your browser, to see the components in a Storybook instance. It will also watch for updates to your code, so any changes you make will be reflected in the Storybook instance live, any time you save.

## Contributing Components

Compound is a completely open source set of components that work with each other. If you find yourself using these components as starter files in your projects, feel free to contribute your own components to the repo!

When you do, remember to add it to the `system.emulsify.json` file so that it's exposed to the CLI! You can place it wherever is appropriate inside the `variants > components` section.

If the component has dependencies, be sure to identify them, so that the CLI knows to install them as well.

Components with a leading underscore, such as `_tab.twig`, indicate that the twig file is not intended to be used on its own, but rather as part of a higher level component.

### Common Scripts

These are the most common npm scripts you may find yourself using:
(Each is prefixed with `npm run`)

- `develop`<br>
Initializes [Webpack](https://webpack.js.org/) to compile existing files and watch for additional changes. It also starts an instance of [storybook](https://storybook.js.org/) that auto-refreshes when file changes are detected.

- `lint`<br>
Runs [stylelint](https://stylelint.io/) for your sass files and [eslint](https://eslint.org/) for your javascript files. The eslint configuration enforces formatting based on [prettier](https://prettier.io/docs/en/index.html) and javascript comments according to [JSdoc](https://jsdoc.app/).

```
{
  "name": "card",
  "structure": "molecules",
  "dependency": ["images", "text", "links", "buttons"]
},
```

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
