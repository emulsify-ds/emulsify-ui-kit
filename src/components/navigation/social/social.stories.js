// Markup.
import socialNavTwig from './social.twig';
import socialNavDataProps from './social.component.yml';

// Data.
const socialNavData = socialNavDataProps.props.properties.items.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Navigation/Social' };

export const social = () => socialNavTwig({ items: socialNavData });
