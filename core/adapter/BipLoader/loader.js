import requireAll from 'require-all'
import forOwn from 'lodash/forOwn'
import config from '../../config'

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
    return bips
  }

	/**
	 * Init all loaded bips
	 */
  function initBips() {
    const bips = loadBips()
    bips.forEach(bip => bip.init())
  }

  return {
    initBips,
  }
}

export default loader
