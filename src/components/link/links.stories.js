import link from './link.twig';
import { props } from './link.component.yml';

const linkData = props.properties;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography/Links' };

export const links = () => `
  <div class="cl-container cl-spaced-row">
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__attributes: linkData.link__attributes.data,
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__attributes: {
      target: '_blank',
    },
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__style: 'no-underline',
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__style: 'no-underline',
    link__attributes: {
      target: '_blank',
    },
  })}
  </div>
  <div class="cl-container cl-spaced-row" data-component-theme="inverse">
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__attributes: linkData.link__attributes.data,
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__attributes: {
      target: '_blank',
    },
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__attributes: linkData.link__attributes.data,
    link__style: 'no-underline',
  })}
  ${link({
    link__url: linkData.link__url.data,
    link__content: linkData.link__content.data,
    link__style: 'no-underline',
    link__attributes: {
      target: '_blank',
    },
  })}
  </div>
`;
