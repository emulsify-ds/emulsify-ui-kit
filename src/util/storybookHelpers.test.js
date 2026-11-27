import { argsFromSchema } from './argsFromSchema.js';
import { withStorybookContainer } from './storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from './storybookContainerControls.js';

const { jest } = import.meta;

describe('argsFromSchema', () => {
  test('uses the first example before the default and keeps falsy values', () => {
    const props = {
      properties: {
        label: { examples: ['First', 'Second'], default: 'Default' },
        selected: { examples: [false], default: true },
        count: { examples: [], default: 0 },
        description: { default: '' },
        image: { examples: [null], default: '/example.jpg' },
        omitted: { type: 'string' },
      },
    };

    expect(argsFromSchema(props)).toEqual({
      label: 'First',
      selected: false,
      count: 0,
      description: '',
      image: null,
    });
    expect(argsFromSchema(props.properties)).toEqual(argsFromSchema(props));
    expect(argsFromSchema()).toEqual({});
  });
});

describe('Storybook containers', () => {
  test('renders the content with mapped args and uses the active preview controls', () => {
    const render = jest.fn(() => '<p>Component preview</p>');
    const template = withStorybookContainer(
      (args) => render({ ...args, mappedTitle: args.title.toUpperCase() }),
      { innerClass: 'example-content' },
    );
    const args = {
      title: 'Story',
      theme: 'default',
      themeVariation: 'dark',
      width: 'narrow',
      alignment: 'left',
      spacing: 'half',
    };
    const preview = document.createElement('div');
    preview.innerHTML = template(args);
    const container = preview.querySelector('.container');

    expect(render).toHaveBeenCalledWith({ ...args, mappedTitle: 'STORY' });
    expect(container.dataset).toMatchObject({
      componentTheme: 'default dark',
      componentWidth: 'narrow',
      componentAlignment: 'left',
      componentSpacing: 'half',
      componentBg: 'true',
    });
    expect(
      container.querySelector('.container__inner.example-content p')
        .textContent,
    ).toBe('Component preview');
  });

  test('sets wrapper defaults and escapes fixed attributes', () => {
    const preview = document.createElement('div');
    const template = withStorybookContainer(() => '<p>Preview</p>', {
      componentWidth: 'wide',
      spacing: 'compact" & tight',
      bgColor: false,
    });
    preview.innerHTML = template({ width: 'narrow' });
    const { dataset } = preview.firstElementChild;

    expect(dataset).toMatchObject({
      componentTheme: 'default light',
      componentWidth: 'wide',
      componentAlignment: 'center',
      componentSpacing: 'compact" & tight',
    });
    expect(dataset.componentBg).toBeUndefined();
  });
});

test('groups the supported width and theme controls under Appearance', () => {
  const width = createContainerWidthControls();
  const theme = createContainerThemeControls();

  expect(width.args).toEqual({ width: 'content' });
  expect(theme.args).toEqual({ theme: 'default', themeVariation: 'light' });
  expect(width.argTypes.width.options).toEqual([
    'narrow',
    'content',
    'wide',
    'full',
  ]);
  expect(theme.argTypes.theme.options).toEqual(['default']);
  expect(theme.argTypes.themeVariation.options).toEqual(['light', 'dark']);
  for (const control of Object.values({
    ...width.argTypes,
    ...theme.argTypes,
  })) {
    expect(control.table.category).toBe('Appearance');
  }
});
