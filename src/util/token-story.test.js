import { contrastRatio, tokenRows } from './token-story.js';

test('labels token rows with their copyable custom properties', () => {
  expect(tokenRows({ 16: '1rem' }, 'space', 'space')).toEqual([
    { name: '16', value: '1rem', usage: 'var(--space-16)', sample: 'space' },
  ]);
});

test('calculates WCAG contrast against either light or dark backgrounds', () => {
  expect(contrastRatio('#000', '#FFFFFF')).toBeCloseTo(21);
  expect(contrastRatio('#fff', '#000000')).toBeCloseTo(21);
  expect(contrastRatio('#123', '#112233')).toBeCloseTo(1);
  expect(contrastRatio('#777', '#fff')).toBeCloseTo(4.48);
});
