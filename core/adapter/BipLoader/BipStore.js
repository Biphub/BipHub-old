const bips = []

/**
 * Pushes a new bip to the collection
 * @param bip
 */
const storeBip = (bip) => {
  bips.push(bip)
}

/**
 * Removes bip from the collection
 * @param index
 */
const removeBip = (index) => {
  bips.splice(index, 1)
}

/**
 * Retrieves store
 */
const getBips = () => bips

export default {
  storeBip,
  removeBip,
  getBips,
}
