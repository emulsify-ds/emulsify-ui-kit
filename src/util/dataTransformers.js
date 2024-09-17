/**
 * Maps properties from a given data object to a new object containing only the `data` values.
 *
 * This function iterates through the keys of the `props` object and extracts the `data` property
 * from each key, if it exists. The result is a new object where each key has its corresponding `data` value.
 *
 * @param {Object} props - The object containing properties with `data` fields.
 * @return {Object} - A new object where each key is mapped to its `data` value from the original object.
 */
export function mapDataToTwig(props) {
  const result = {};

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (props[key]?.data !== undefined) {
        result[key] = props[key].data;
      } else if (
        typeof props[key] === 'object' &&
        props[key].hasOwnProperty('properties')
      ) {
        result[key] = mapDataToTwig(props[key].properties);
      }
    }
  }

  return result;
}
