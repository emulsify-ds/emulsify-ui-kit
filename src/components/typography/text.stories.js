import { mapDataToTwig } from '../../util/dataTransformers';

/* Twigs */
import heading from './heading/heading.twig';
import blockquoteTemplate from './text/blockquote.twig';
import preTemplate from './text/pre.twig';
import paragraphTemplate from './text/inline-elements.twig';
import codeTemplate from './text/code.twig';

/* Data */
import { props as blockquoteProps } from './text/blockquote.yml';
import { props as headingProps } from './heading/heading.component.yml';
import { props as codeProps } from './text/code.yml';

/**
 * Storybook Definition.
 */

const blockquoteData = mapDataToTwig(blockquoteProps.properties);
const codeData = mapDataToTwig(codeProps.properties);
const headingData = headingProps.example;

export default { title: 'Components/Typography' };

export const headings = () =>
  `<div class="text-long"> ${headingData
    .map((d) => heading(d))
    .join('')}</div>`;

export const blockquote = () => blockquoteTemplate(blockquoteData);

export const preformatted = () => preTemplate();

export const random = () => paragraphTemplate();

export const code = () => codeTemplate(codeData);
