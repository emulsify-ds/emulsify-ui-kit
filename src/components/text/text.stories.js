import heading from './headings/_heading.twig';
import blockquoteTemplate from './text/02-blockquote.twig';
import preTemplate from './text/05-pre.twig';
import paragraphTemplate from './text/03-inline-elements.twig';
import codeTemplate from './text/07-code.twig';

import blockquoteData from './text/blockquote.yml';
import headingData from './headings/headings.yml';
import codeData from './text/code.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography' };

export const headings = () => headingData.map((d) => heading(d)).join('');

export const blockquote = () => blockquoteTemplate(blockquoteData);

export const preformatted = () => preTemplate();

export const random = () => paragraphTemplate();

export const code = () => codeTemplate(codeData);
