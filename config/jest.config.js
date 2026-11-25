export default {
  rootDir: '..',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/{components,src}/**/*.{test,spec}.{js,mjs,cjs}'],
  collectCoverageFrom: [
    'components/**/*.{js,mjs,cjs}',
    'src/**/*.{js,mjs,cjs}',
    '!src/tokens/build-tokens.mjs',
  ],
  coverageDirectory: '.coverage',
  passWithNoTests: true,
};
