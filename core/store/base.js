const store = {}
/**
 * Base of simple state store
 * @returns {{set: (function(*, *)), get: (function(*): *)}}
 */
const base = () => {
  const set = (key, data) => {
    store[key] = data
  }
  const get = key => store[key]

  return {
    set,
    get,
  }
}

export default base()
