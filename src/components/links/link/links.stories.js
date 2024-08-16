import link from './link.twig';
import { props } from './link.component.yml';

const linkData = props.properties;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography/Links' };

export const links = () =>
  link({
    link_url: linkData.link_url.data,
    link_content: linkData.link_content.data,
    link_attributes: linkData.link_attributes.data,
  });
