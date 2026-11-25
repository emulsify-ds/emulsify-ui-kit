import { renderTwig } from '@emulsify/core/storybook';
import figma from '../../../config/configma.json';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Breakpoints',
  render: renderTwig(template),
};

const rows = Object.entries(tokens.breakpoints).map(([name, query]) => ({
  name,
  value: Object.entries(query)[0].join(': '),
  usage: `@include breakpoint('${name}') { }`,
}));

export const Breakpoints = {
  args: { heading: 'Breakpoints', sections: [{ rows }] },
  parameters: { design: { type: 'figma', url: figma.url + figma.breakpoints } },
};
