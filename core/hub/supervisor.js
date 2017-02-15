import requireAll from 'require-all'
import forOwn from 'lodash/forOwn'

let bips = []

/**
 * Loads all bips using require all
 * TODO: refactor it so that it loads bips
 * according to env
 */
function loadBips() {
  const rawBips = requireAll(`${__dirname}/../../bips`)
  bips = []
  forOwn(rawBips, (value, key) => {
    bips.push(rawBips[key].index.default)
  })
}

/**
 * Init all loaded bips
 * TODO: Check if bips are loaded
 */
function initBips() {
  loadBips()
  bips.forEach(bip => bip.init())
}

/**
 * Restarts all loaded bips
 */
const restartBips = () => {
  bips.forEach(bip => console.log('restarting bip ', bip))
}

export default {
  initBips,
  restartBips,
}
