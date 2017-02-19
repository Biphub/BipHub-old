import requireAll from 'require-all'
import forOwn from 'lodash/forOwn'
import config from '../../config'
import bipStore from '../../store/bipStore'

const loader = () => {
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
    const bips = []
    forOwn(rawBips, (value, key) => {
      bips.push(rawBips[key].index.default)
    })
    bipStore.set(bips)
  }

	/**
	 * Init all loaded bips
	 */
  function initBips() {
    loadBips()
    const bips = bipStore.get()
    bips.forEach(bip => bip.init())
  }

	/**
	 * Restarts all loaded bips
	 */
  const restartBips = () => {
    const bips = bipStore.get()
    bips.forEach(bip => console.log('restarting bip ', bip))
  }

  return {
    initBips,
    restartBips,
  }
}

export default loader
