import requireAll from 'require-all'
import forOwn from 'lodash/forOwn'
import config from '../../../config'
import store from './BipStore'

/**
 * Loads bips from bips folder or npm modules.
 * Folder to load bips is decided according to NDOE_ENV value
 */
function loadBips() {
  const nodeEnv = config.get('NODE_ENV')
  let rawBips = {}
  if (nodeEnv === 'development') {
    rawBips = requireAll(`${__dirname}/../../../bips`)
  }
  forOwn(rawBips, (value, key) => {
    store.storeBip(rawBips[key].index.default)
  })
}

/**
 * Init all loaded bips
 */
function initBips() {
  loadBips()
  const bips = store.getBips()
  bips.forEach(bip => bip.init())
}

/**
 * Restarts all loaded bips
 */
const restartBips = () => {
  const bips = store.getBips()
  bips.forEach(bip => console.log('restarting bip ', bip))
}

export default {
  initBips,
  restartBips,
}
