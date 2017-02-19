import get from 'lodash/get'

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
