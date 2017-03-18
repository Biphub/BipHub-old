/**
 * Serializes array into a string
 * @param array
 * @returns {null}
 */
const toString = (array) => {
  if (typeof array !== 'undefined' && array !== null) {
  	console.log('stringing')
    return JSON.stringify(array)
  }
  return null
}

export default {
  toString,
}
