const triggerSelector =
  'button.js-copy-trigger[data-usage]:not(:disabled, [aria-disabled="true"])';
const toastId = 'storybook-copy-status';

function copyWithSelection(text) {
  const focused = document.activeElement;
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.tabIndex = -1;
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);

  try {
    field.focus({ preventScroll: true });
    field.select();
    return document.execCommand?.('copy') ?? false;
  } catch {
    return false;
  } finally {
    field.remove();
    focused?.focus?.({ preventScroll: true });
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back when clipboard permissions are unavailable.
    }
  }

  return copyWithSelection(text);
}

function installCopyUsage() {
  const status = document.createElement('div');
  status.id = toastId;
  status.className = 'sb-toast';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  Object.assign(status.style, {
    position: 'fixed',
    insetBlockEnd: '1rem',
    insetInlineEnd: '1rem',
    maxInlineSize: 'calc(100% - 2rem)',
    pointerEvents: 'none',
    zIndex: '1000',
  });
  document.body.append(status);

  const message = document.createElement('span');
  Object.assign(message.style, {
    display: 'block',
    overflowWrap: 'anywhere',
    padding: '0.75rem 1rem',
    border: '1px solid CanvasText',
    backgroundColor: 'Canvas',
    color: 'CanvasText',
  });
  let dismiss;

  async function copyFromTrigger(trigger) {
    const text = trigger.dataset.usage;
    if (!text) return;

    const copied = await copyText(text);
    message.textContent = copied
      ? 'Copied to clipboard'
      : 'Unable to copy to clipboard';
    status.replaceChildren(message);
    clearTimeout(dismiss);
    dismiss = setTimeout(() => status.replaceChildren(), 2000);
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest?.(triggerSelector);
    if (trigger) void copyFromTrigger(trigger);
  });
}

if (!document.getElementById(toastId)) installCopyUsage();
