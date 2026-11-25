function appearanceSelect(name, options) {
  return {
    name,
    control: 'select',
    options,
    table: { category: 'Appearance' },
  };
}

export function createContainerWidthControls() {
  return {
    argTypes: {
      width: appearanceSelect('Container width', [
        'narrow',
        'content',
        'wide',
        'full',
      ]),
    },
    args: { width: 'content' },
  };
}

export function createContainerThemeControls() {
  return {
    argTypes: {
      theme: appearanceSelect('Container theme', ['default']),
      themeVariation: appearanceSelect('Theme variation', ['light', 'dark']),
    },
    args: { theme: 'default', themeVariation: 'light' },
  };
}
