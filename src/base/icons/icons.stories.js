import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import gallery from './icons.twig';

const theme = createContainerThemeControls();
const assets = import.meta.glob('/assets/icons/*.svg');
const icons = Object.keys(assets)
  .map((path) => path.split('/').at(-1).slice(0, -4))
  .sort();

export default {
  title: 'Base/Icons',
  render: renderTwig(withStorybookContainer(gallery)),
  args: { icons, ...theme.args },
  argTypes: { ...theme.argTypes },
};

export const Library = {};
