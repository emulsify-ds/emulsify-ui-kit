module.exports = {
  extends: [
    '@fourkitchens/eslint-config-and-other-formatting/stylelint.config',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'at-root',
          'each',
          'else',
          'extend',
          'forward',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'use',
          'while',
        ],
      },
    ],
  },
};
