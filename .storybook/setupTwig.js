const { resolve } = require('path');
const twigDrupal = require('twig-drupal-filters');
const twigBEM = require('bem-twig-extension');
const twigAddAttributes = require('add-attributes-twig-extension');

/**
 * Fetches project-based variant configuration. If no such configuration
 * exists, returns default values.
 *
 * @returns project-based variant configuration, or default config.
 */
const fetchVariantConfig = () => {
  try {
    return require('../project.emulsify.json').variant.structureImplementations;
  } catch (e) {
    return [
      {
        name: 'components',
        directory: './src/components/components',
      },
      {
        name: 'base',
        directory: './src/components/components/00-base',
      },
      {
        name: 'atoms',
        directory: './src/components/components/01-atoms',
      },
      {
        name: 'molecules',
        directory: './src/components/components/02-molecules',
      },
      {
        name: 'organisms',
        directory: './src/components/components/03-organisms',
      },
      {
        name: 'templates',
        directory: './src/components/components/04-templates',
      },
    ];
  }
};

module.exports.namespaces = {
  atoms: resolve(__dirname, '../', 'components/components/01-atoms'),
  molecules: resolve(__dirname, '../', 'components/components/02-molecules'),
  organisms: resolve(__dirname, '../', 'components/components/03-organisms'),
  templates: resolve(__dirname, '../', 'components/components/04-templates'),
};

for (const { name, directory } of fetchVariantConfig()) {
  module.exports.namespaces[name] = resolve(__dirname, '../', directory);
}

/**
 * Configures and extends a standard twig object.
 *
 * @param {Twig} twig - twig object that should be configured and extended.
 *
 * @returns {Twig} configured twig object.
 */
module.exports.setupTwig = function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigBEM(twig);
  twigAddAttributes(twig);
  return twig;
};
