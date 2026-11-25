/**
 * Pick Storybook args from component.yml props or its properties map.
 */
export function argsFromSchema(props) {
  const properties = props?.properties ?? props ?? {};

  return Object.fromEntries(
    Object.entries(properties).flatMap(([name, schema]) => {
      const example = Array.isArray(schema?.examples)
        ? schema.examples[0]
        : undefined;

      if (example !== undefined) return [[name, example]];
      if (schema && Object.hasOwn(schema, 'default')) {
        return [[name, schema.default]];
      }

      return [];
    }),
  );
}
