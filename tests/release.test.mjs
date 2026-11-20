import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes } from '@semantic-release/release-notes-generator';
import { resolveConfig } from '@semantic-release/core';
import * as rollout from '../config/semantic-release-v2.js';

const require = createRequire(import.meta.url);
const config = require('../release.config.cjs');
const pluginOptions = (name) =>
  config.plugins.find(
    (plugin) => Array.isArray(plugin) && plugin[0] === name,
  )[1];
const logger = {
  log() {},
  warn() {},
  error() {},
  success() {},
  scope() {
    return this;
  },
};
const commit = (message, index = 1) => ({
  message,
  hash: index.toString(16).padStart(40, '0'),
  committerDate: '2026-11-20T12:00:00Z',
});

for (const [message, expected] of [
  ['fix: repair a component', 'patch'],
  ['feat: add a component', 'minor'],
  ['feat!: replace the public API', 'major'],
  ['fix(component)!: remove an old option', 'major'],
  [
    'refactor: replace an API\n\nBREAKING CHANGE: the old API was removed',
    'major',
  ],
  ['chore: update dependencies', null],
]) {
  test(`conventional release type: ${message.split('\n')[0]}`, async () => {
    assert.equal(
      await analyzeCommits(pluginOptions('@semantic-release/commit-analyzer'), {
        cwd: process.cwd(),
        commits: [commit(message)],
        logger,
      }),
      expected,
    );
  });
}

test('the 2.0.0 rollout happens once and survives a non-conventional merge title', () => {
  const context = {
    lastRelease: { version: '1.12.0' },
    commits: [commit('Merge release-2.x')],
  };
  assert.equal(rollout.analyzeCommits({}, context), 'major');
  assert.doesNotThrow(() =>
    rollout.verifyRelease(
      {},
      { ...context, nextRelease: { version: '2.0.0' } },
    ),
  );
  assert.throws(() =>
    rollout.verifyRelease(
      {},
      { ...context, nextRelease: { version: '1.13.0' } },
    ),
  );
  assert.throws(() =>
    rollout.verifyRelease(
      {},
      { lastRelease: {}, nextRelease: { version: '1.0.0' } },
    ),
  );
  for (const version of ['2.0.0', '2.0.1', '3.0.0']) {
    assert.equal(
      rollout.analyzeCommits({}, { lastRelease: { version } }),
      undefined,
    );
    assert.doesNotThrow(() =>
      rollout.verifyRelease(
        {},
        { lastRelease: { version }, nextRelease: { version: '3.0.1' } },
      ),
    );
  }
});

test('the configured plugin pipeline forces the rollout once and then follows conventional commits', async () => {
  const context = {
    cwd: process.cwd(),
    env: {},
    logger,
    stdout: process.stdout,
    stderr: process.stderr,
  };
  const { options, plugins } = await resolveConfig(
    context,
    { dryRun: true },
    { buildPlugins: true },
  );
  for (const [version, message, expected] of [
    ['1.11.0', 'Merge release-2.x', 'major'],
    ['1.12.0', 'fix: update dependencies', 'major'],
    ['2.0.0', 'fix: repair a component', 'patch'],
    ['2.0.0', 'feat: add a component', 'minor'],
    ['2.0.0', 'feat!: change the public API', 'major'],
    ['2.0.0', 'chore: update dependencies', undefined],
  ]) {
    assert.equal(
      await plugins.analyzeCommits({
        ...context,
        options,
        lastRelease: { version },
        commits: [commit(message)],
      }),
      expected,
      `${version} + ${message}`,
    );
  }
});

test('release notes include features, fixes, and breaking changes', async () => {
  const notes = await generateNotes(
    pluginOptions('@semantic-release/release-notes-generator'),
    {
      cwd: process.cwd(),
      env: {},
      logger,
      options: { repositoryUrl: config.repositoryUrl },
      lastRelease: { gitTag: '1.12.0' },
      nextRelease: { version: '2.0.0', gitTag: '2.0.0', type: 'major' },
      commits: [
        commit('feat: add the new component', 1),
        commit('fix: repair the old component', 2),
        commit(
          'feat!: replace the old API\n\nBREAKING CHANGE: consumers must use the new API',
          3,
        ),
        commit('chore!: require Node 26', 4),
      ],
    },
  );
  for (const text of [
    '2.0.0',
    'add the new component',
    'repair the old component',
    'consumers must use the new API',
    'require Node 26',
  ]) {
    assert.ok(notes.includes(text), `Release notes omit ${text}`);
  }
});
