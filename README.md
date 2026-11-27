[![Emulsify Design System](https://user-images.githubusercontent.com/409903/170579210-327abcdd-2c98-4922-87bb-36446a4cc013.svg)](https://www.emulsify.info/)

# Emulsify UI kit vision

The Emulsify UI Kit is a tool for designers and front-end engineers to build high-quality user interfaces effectively and efficiently while maintaining WCAG 2.2 AA standards and project performance goals.

The Emulsify UI Kit gives users access to a library of prebuilt tokens and components that follow accessibility best practices and are easy to customize. The components in the kit are fully responsive, carefully designed, and can be implemented for modification in every project.

## The goals of the Emulsify UI Kit are to

- Create efficiency in the user interface design process
- Establish consistency in user interface design
- Maintain high accessibility standards

The Emulsify UI Kit has two distinct building blocks: the Figma and the code repo. These two items are kept in alignment for a seamless experience.

## What the Emulsify UI Kit is not

- Handcuffs. If using the kit is a barrier to a successful project, do what you need to for your project to be successful and provide feedback on why the kit was a barrier.
- A "default" visual design. Your visual design work should be tailor-made for each of your clients.

## There are two parts of this UI Kit

- [Figma UI Kit](https://www.figma.com/community/file/1141071510618977331)
- [Storybook](emulsify-ds.github.io/emulsify-ui-kit/)

## Two ways to get started

### Use the Emulsify CLI

Use Node.js 24.13.0 or newer and run these commands from the directory where you want to create the Drupal starter.

```sh
npm install -g @emulsify/cli@2.4.1
emulsify init "Emulsify Drupal Starter" . --platform drupal --yes
cd emulsify_drupal_starter
emulsify system install \
  --repository https://github.com/emulsify-ds/emulsify-ui-kit.git \
  --checkout release-2.x --all --yes
```

Replace `release-2.x` with the tag or branch you want to install.

### Deploy to Netlify

This will make your own copy of the repo and push the code to Netlify, where you can review the UI kit.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/emulsify-ds/emulsify-ui-kit)

## Connecting components with Figma

First, get your own copy of the [Emulsify UI kit](https://www.figma.com/community/file/1141071510618977331) from the Figma community.

The strength of this UI kit leans on its connection with Figma via [Tokens Studio](https://tokens.studio/).

To connect the Figma file with your code, [see the instructions in the Tokens Studio documentation](https://docs.tokens.studio/sync/github).

## Creating a component

A complete component meets the following criteria:

1. Design tokens are defined as their own set in Figma, in the Token Studio plugin, and they use references to values defined in `semantic` as much as possible.
2. The component has an independent frame in Figma.
3. Use the generated Base tokens and expose component custom properties for local overrides. See the CTA example below.
4. A component's story connects to the corresponding Figma frame, defined in `config/configma.json`.
5. The component passes WCAG 2.2 AA.

## Example component

CTA inherits the active theme. Set its local properties on an ancestor to customize the actions within that section. [CTA documentation](https://emulsify-ds.github.io/emulsify-ui-kit/?path=/docs/components-cta--docs)

```css
.newsletter-actions {
  --cta-background-color: var(--clr-body);
  --cta-color: var(--clr-background);
  --cta-background-color-hover: var(--clr-link);
  --cta-color-hover: var(--clr-background);
}
```

### Naming tokens

See [this whiteboard](https://www.figma.com/file/l6MIPQCewbIJoKvZpxhAwr/Token-Naming?node-id=0%3A1&t=5IaZF2ZNEoruxEld-1) that outlines the preferred naming convention for design tokens.

### Connecting a component's story to the corresponding Figma frame

1. In Figma, select the frame to share and activate the Share button (in the upper right hand corner).
2. In the share modal make sure that "Link to selected frame" is checked and activate "Copy link".
3. Open `config/configma.json` and confirm the following:
4. Using this example: `https://www.figma.com/file/[FIGMA_FILE_ID]/[FIGMA_FILE_NAME]?node-id=[NODE_ID]`
5. Confirm that `url` has the correct `FIGMA_FILE_ID` and `FIGMA_FILE_NAME`.
6. Add your component name to the file as a key with the `NODE_ID` being the value.
7. Import `configma.json` into your story.
8. In the parameters of your story, include `figma.$KEY` as shown below.

```js
Spacing.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.spacing,
  },
};
```

## Contributing to this UI Kit

Use Node.js 24 LTS (`.nvmrc`), version 24.13.0 or newer, and install the locked dependencies:

```sh
nvm use
npm ci
npm run develop
```

Before opening a pull request, run `npm run validate` and `npm run storybook-build`.
Validation includes lint, the component contract, release tests, Sass tests, and Jest.

### Releases

The Release workflow runs when changes are pushed or merged into `main`.
Conventional commits determine the next version: `fix:` creates a patch,
`feat:` creates a minor release, and `feat!:` or a `BREAKING CHANGE:` footer
creates a major release. Other commit types do not create a release by themselves.
For squash merges, use a conventional commit as the pull request title and keep
any breaking change footer in the squash commit message.

The `release-2.x` rollout intentionally creates `2.0.0`, regardless of its merge
commit title. Its one-time release plugin requests a major release while the last
tag is below 2.0.0 and verifies that the result is exactly `2.0.0`. Once that tag
exists, subsequent releases follow conventional commits normally. The bootstrap
plugin can then be removed from `release.config.cjs`.

Before tagging, semantic-release updates `package.json` and `package-lock.json`
and commits any version changes to `main` as `chore(release): VERSION [skip ci]`.
The GitHub release, tag, and both package versions agree, including when the
merged branch already contains the calculated version.
This project publishes GitHub releases; npm registry publishing is disabled.

Configure a repository Actions secret named `RELEASE_TOKEN` with repository
contents, issues, and pull requests write access and permission to bypass `main`'s
required pull request review. The existing branch protection exempts
administrators, so a token owned
by an administrator can push the version commit. The workflow uses this token
for checkout, the version commit, tags, and the GitHub release; it falls back to
`GITHUB_TOKEN` for repositories whose rules already permit the workflow token.

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
        <a href=https://github.com/mariannuar>
            <img src=https://avatars.githubusercontent.com/u/48533432?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Mariana Núñez/>
            <br />
            <sub style="font-size:14px"><b>Mariana Núñez</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/brendan-wu-4K>
            <img src=https://avatars.githubusercontent.com/u/87146740?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=brendan-wu-4K/>
            <br />
            <sub style="font-size:14px"><b>brendan-wu-4K</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/mndonx>
            <img src=https://avatars.githubusercontent.com/u/2343957?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Amanda Luker/>
            <br />
            <sub style="font-size:14px"><b>Amanda Luker</b></sub>
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
