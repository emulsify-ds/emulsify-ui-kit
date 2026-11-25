const htmlEntities = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };

function escapeAttribute(value) {
  return String(value).replace(
    /[&"<>]/g,
    (character) => htmlEntities[character],
  );
}

/**
 * Wrap a Twig callback in the preview container for width and theme controls.
 */
export function withStorybookContainer(render, options = {}) {
  return (args = {}) => {
    const {
      theme = args.theme ?? 'default',
      themeVariation = args.themeVariation ?? 'light',
      componentWidth = args.width ?? 'content',
      componentAlignment = args.alignment ?? 'center',
      spacing = args.spacing ?? 'one',
      innerClass,
      bgColor = args.bgColor ?? true,
    } = options;
    const componentTheme = [theme, themeVariation].filter(Boolean).join(' ');
    const innerClasses = ['container__inner', innerClass]
      .filter(Boolean)
      .join(' ');

    const background = bgColor ? ' container--with-bg' : '';
    const backgroundAttribute = bgColor ? ' data-component-bg="true"' : '';

    return `<div class="container${background}"${backgroundAttribute}
      data-component-theme="${escapeAttribute(componentTheme)}"
      data-component-width="${escapeAttribute(componentWidth)}"
      data-component-alignment="${escapeAttribute(componentAlignment)}"
      data-component-spacing="${escapeAttribute(spacing)}">
      <div class="${escapeAttribute(innerClasses)}">${render(args)}</div>
    </div>`;
  };
}

/**
 * Keep the existing preview padding for stories using legacy layout classes.
 */
export function withStorybookPadding(
  render,
  { className = 'cl-container', innerClass, theme } = {},
) {
  return (args = {}) => {
    const content = render(args);
    const themeAttribute = theme
      ? ` data-component-theme="${escapeAttribute(theme)}"`
      : '';
    const inner = innerClass
      ? `<div class="${escapeAttribute(innerClass)}">${content}</div>`
      : content;

    return `<div class="${escapeAttribute(className)}"${themeAttribute}>${inner}</div>`;
  };
}
