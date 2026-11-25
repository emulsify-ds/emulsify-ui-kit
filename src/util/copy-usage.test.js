import './copy-usage.js';

const { jest } = import.meta;

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard',
);
const originalExecCommand = Object.getOwnPropertyDescriptor(
  document,
  'execCommand',
);

function setMethod(owner, name, value) {
  Object.defineProperty(owner, name, { configurable: true, value });
}

function restoreMethod(owner, name, original) {
  if (original) Object.defineProperty(owner, name, original);
  else delete owner[name];
}

let fixture;
let copyButton;

beforeEach(() => {
  jest.useFakeTimers();
  fixture = document.createElement('div');
  fixture.innerHTML =
    '<button type="button" class="js-copy-trigger" data-usage="var(--clr-text)"><span>Copy token</span></button>';
  document.body.append(fixture);
  copyButton = fixture.querySelector('button');
});

afterEach(async () => {
  await jest.runAllTimersAsync();
  jest.useRealTimers();
  restoreMethod(navigator, 'clipboard', originalClipboard);
  restoreMethod(document, 'execCommand', originalExecCommand);
  fixture.remove();
});

test('copies a dynamically rendered token and announces the result', async () => {
  const writeText = jest.fn().mockResolvedValue();
  setMethod(navigator, 'clipboard', { writeText });
  const status = document.querySelector('[role="status"]');

  copyButton.querySelector('span').click();
  await jest.advanceTimersByTimeAsync(0);

  expect(writeText).toHaveBeenCalledWith('var(--clr-text)');
  expect(status.getAttribute('aria-live')).toBe('polite');
  expect(status.textContent).toBe('Copied to clipboard');
  await jest.advanceTimersByTimeAsync(2000);
  expect(status.textContent).toBe('');
});

test('falls back to selection and restores focus when clipboard access fails', async () => {
  setMethod(navigator, 'clipboard', {
    writeText: jest.fn().mockRejectedValue(new Error('Permission denied')),
  });
  const fallback = jest.fn(() => {
    expect(document.activeElement.value).toBe('var(--clr-text)');
    return true;
  });
  setMethod(document, 'execCommand', fallback);
  copyButton.focus();
  copyButton.click();
  await jest.advanceTimersByTimeAsync(0);

  expect(fallback).toHaveBeenCalledWith('copy');
  expect(document.querySelector('textarea')).toBeNull();
  expect(document.activeElement).toBe(copyButton);
  expect(document.querySelector('[role="status"]').textContent).toBe(
    'Copied to clipboard',
  );
});

test('announces a clipboard failure when neither copy method is available', async () => {
  setMethod(navigator, 'clipboard', undefined);
  setMethod(document, 'execCommand', undefined);

  copyButton.click();
  await jest.advanceTimersByTimeAsync(0);

  expect(document.querySelector('[role="status"]').textContent).toBe(
    'Unable to copy to clipboard',
  );
});
