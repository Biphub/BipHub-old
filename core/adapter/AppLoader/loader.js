import R from 'ramda'
import requireAll from 'require-all'
import config from '../../config'

const loader = () => {
	/**
	 * Loads APIs from APIs folder or npm modules.
	 * Folder to load APIs is decided according to NDOE_ENV value
	 */
  function loadAPIs () {
    const nodeEnv = config.get('NODE_ENV')
    let rawAPIs = {}
    if (nodeEnv === 'development') {
      rawAPIs = requireAll(`${__dirname}/../../../apps`)
    }
    // TODO: Implement production version
    const APIs = []
    R.forEachObjIndexed((value, key) => {
      APIs.push(rawAPIs[key].index.default)
    })(rawAPIs)
    return APIs
  }

	/**
	 * Init all loaded APIs
	 */
  function initAPIs () {
    const APIs = loadAPIs()
    APIs.forEach(api => api.init())
  }

  return {
    initAPIs
  }
}

export default loader
