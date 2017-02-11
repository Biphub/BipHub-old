import nconf from 'nconf'
import path from 'path'

const loadNConf = () => {
	const configPath = __dirname

  // TODO: Check if nconf.Provier() is necessary
  // TODO: Check what this does
	nconf.argv().env()

  // Loads hub config
	nconf.file('hub', { file: path.join(configPath, 'hub.json') })

  // Loads web config
	nconf.file('web', { file: path.join(configPath, 'web.json') })

	return nconf
}

export default loadNConf()
