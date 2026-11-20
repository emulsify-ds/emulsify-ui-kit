// ponytail: retire this bootstrap after 2.0.0; later releases use conventional commits.
const needsV2Release = ({ version }) =>
  !version || Number.parseInt(version, 10) < 2;

export function analyzeCommits(_pluginConfig, { lastRelease }) {
  return needsV2Release(lastRelease) ? 'major' : undefined;
}

export function verifyRelease(_pluginConfig, { lastRelease, nextRelease }) {
  if (needsV2Release(lastRelease) && nextRelease.version !== '2.0.0') {
    throw new Error(
      'The 2.x rollout must release 2.0.0. Fetch the existing 1.x tags before releasing.',
    );
  }
}
