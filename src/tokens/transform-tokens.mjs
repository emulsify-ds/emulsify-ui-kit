import { readFile, writeFile } from 'node:fs/promises';
import { transformTokens } from 'token-transformer';

// Use the library API because the legacy CLI's yargs loader fails on Node 26.
const tokens = JSON.parse(
  await readFile(new URL('./figma.tokens.json', import.meta.url), 'utf8'),
);
const tokenSets = Object.fromEntries(
  Object.entries(tokens).filter(([name]) => !name.startsWith('$')),
);
const transformed = transformTokens(tokenSets);

await writeFile(
  new URL('./transformed.tokens.json', import.meta.url),
  JSON.stringify(transformed, null, 2),
);
