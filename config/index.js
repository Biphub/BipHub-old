import nconf from 'nconf'
import path from 'path'

const loadNConf = () => {
  const configPath = __dirname

  // TODO: Check if nconf.Provier() is necessary
  // TODO: Check what this does
  nconf.argv().env()

  // Loads configs
  nconf.file('hub', { file: path.join(configPath, 'env/dev/hub.json') })
  nconf.file('web', { file: path.join(configPath, 'env/dev/web.json') })

  return nconf
}

export default loadNConf()
