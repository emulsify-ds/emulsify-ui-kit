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
        <a href=https://github.com/ModulesUnraveled>
            <img src=https://avatars.githubusercontent.com/u/1663810?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Brian Lewis/>
            <br />
            <sub style="font-size:14px"><b>Brian Lewis</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/callinmullaney>
            <img src=https://avatars.githubusercontent.com/u/369018?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Callin Mullaney/>
            <br />
            <sub style="font-size:14px"><b>Callin Mullaney</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/amazingrando>
            <img src=https://avatars.githubusercontent.com/u/409903?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Randy Oest/>
            <br />
            <sub style="font-size:14px"><b>Randy Oest</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mcortes19>
            <img src=https://avatars.githubusercontent.com/u/11282049?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Marvin J. Cortés/>
            <br />
            <sub style="font-size:14px"><b>Marvin J. Cortés</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/joetower>
            <img src=https://avatars.githubusercontent.com/u/366413?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Joe Tower/>
            <br />
            <sub style="font-size:14px"><b>Joe Tower</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/patrickocoffeyo>
            <img src=https://avatars.githubusercontent.com/u/1107871?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Patrick Coffey/>
            <br />
            <sub style="font-size:14px"><b>Patrick Coffey</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mndonx>
            <img src=https://avatars.githubusercontent.com/u/2343957?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Amanda Luker/>
            <br />
            <sub style="font-size:14px"><b>Amanda Luker</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/KurtTrowbridge>
            <img src=https://avatars.githubusercontent.com/u/848721?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Kurt Trowbridge/>
            <br />
            <sub style="font-size:14px"><b>Kurt Trowbridge</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/ryanhagerty>
            <img src=https://avatars.githubusercontent.com/u/8405274?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Ryan Hagerty/>
            <br />
            <sub style="font-size:14px"><b>Ryan Hagerty</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/fertant>
            <img src=https://avatars.githubusercontent.com/u/3853492?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Andrii Shutov/>
            <br />
            <sub style="font-size:14px"><b>Andrii Shutov</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/codeb-a>
            <img src=https://avatars.githubusercontent.com/u/65790558?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Brandon/>
            <br />
            <sub style="font-size:14px"><b>Brandon</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/josue2591>
            <img src=https://avatars.githubusercontent.com/u/9342250?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=josue2591/>
            <br />
            <sub style="font-size:14px"><b>josue2591</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/marcb4k>
            <img src=https://avatars.githubusercontent.com/u/107938318?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Marc Berger/>
            <br />
            <sub style="font-size:14px"><b>Marc Berger</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mariannuar>
            <img src=https://avatars.githubusercontent.com/u/48533432?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Mariana Núñez/>
            <br />
            <sub style="font-size:14px"><b>Mariana Núñez</b></sub>
        </a>
    </td>
</tr>
</table>
