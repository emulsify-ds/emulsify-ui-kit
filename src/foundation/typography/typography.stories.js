// Twig templates
import typeFaces from './type-faces.twig';
import headingStyles from './heading-styles.twig';
import bodyStyles from './body-styles.twig';

// Data files
import typeFacesData from './type-faces.yml';
import headingStyleData from './heading-styles.yml';
import bodyStyleData from './body-styles.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Base/Typography' };

export const TypeFaces = () =>
  `<div class="cl-container">${typeFaces(typeFacesData)}</div>`;

export const HeadingStyles = () =>
  `<div class="cl-container">${headingStyles(headingStyleData)}</div>`;

export const BodyStyles = () =>
  `<div class="cl-container">${bodyStyles(bodyStyleData)}</div>`;
