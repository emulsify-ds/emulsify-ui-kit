/**
 * Maps properties from a given data object to a new object containing only the `data` values.
 *
 * This function iterates through the keys of the `props` object and extracts the `data` property
 * from each key, if it exists. The result is a new object where each key has its corresponding `data` value.
 *
 * @param {Object} props - The object containing properties with `data` fields.
 * @returns {Object} - A new object where each key is mapped to its `data` value from the original object.
 */
export function mapDataToTwig(props) {
  const transformedData = {};

  for (const key in props) {
    if (props.hasOwnProperty(key) && props[key]?.data !== undefined) {
      transformedData[key] = props[key].data;
    }
  }

  return transformedData;
}
