/**
 * Serializes array into a string
 * @param array
 * @returns {null}
 */
const toString = (array) => {
  if (typeof array !== 'undefined' && array !== null) {
    const result = JSON.stringify(array);
    return result;
  }
  return null;
};

export default {
  toString
};
