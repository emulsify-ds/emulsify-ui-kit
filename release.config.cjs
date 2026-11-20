/**
 * @file Semantic Release configuration.
 */

module.exports = {
  tagFormat: '${version}',
  branches: ['main'],
  repositoryUrl: 'https://github.com/emulsify-ds/emulsify-ui-kit.git',
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    // The 2.x rollout is a major release even when its PR is squash-merged.
    './config/semantic-release-v2.js',
    [
      '@semantic-release/release-notes-generator',
      {
        // The current notes generator requires the Angular preset's writer API.
        // Parse Conventional Commit headers here too, including the breaking !.
        preset: 'angular',
        parserOpts: {
          headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
          breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
          noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    ['@semantic-release/npm', { npmPublish: false }],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
