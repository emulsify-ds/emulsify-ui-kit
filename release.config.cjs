/**
 * @file Semantic Release configuration.
 */

module.exports = {
  tagFormat: '${version}',
  branches: ['main'],
  repositoryUrl: 'https://github.com/emulsify-ds/emulsify-ui-kit.git',
  plugins: [
    // Conventional commit analysis determines the next release version.
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        // Release the semantic-release rollout as a minor version.
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'chore', scope: 'emulsif-570', release: 'minor' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    ['@semantic-release/npm', { npmPublish: false }],
    '@semantic-release/github',
  ],
};
