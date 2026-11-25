import { mergeConfig, transformWithOxc } from 'vite';

export default {
  addons: ['@storybook/addon-docs'],
};

export function extendConfig(config) {
  return {
    ...config,
    async viteFinal(viteConfig, context) {
      return mergeConfig(await config.viteFinal(viteConfig, context), {
        plugins: [
          {
            name: 'storybook-jsx-in-js',
            enforce: 'pre',
            transform(code, id) {
              if (!/\.stories\.js(?:\?|$)/.test(id)) return null;

              // Story decorators contain JSX in .js files.
              return transformWithOxc(code, id, {
                lang: 'jsx',
                jsx: { runtime: 'automatic' },
              });
            },
          },
        ],
      });
    },
  };
}
