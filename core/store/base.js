import get from 'lodash/get'

/**
 * Single source of store. It is currently based on JS object
 * for key value store capability
 * @type {{}}
 */
const store = {}
/**
 * Base of simple state store
 * @returns {{set: (function(*, *)), get: (function(*): *)}}
 */
const base = () => {
  const baseSet = (key, data) => {
    store[key] = data
  }
  const baseGet = key => get(store, key, null)

  return {
    set: baseSet,
    get: baseGet,
  }
}

export default base()
