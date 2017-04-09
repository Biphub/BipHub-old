import nconf from 'nconf'
import path from 'path'
import mainConfig from '../../config'

const configPath = __dirname
const ENV_DEV = 'development'
const ENV_PROD = 'production'
const PATH_DEV = 'env/config.development.json'
const PATH_PROD = 'env/config.production.json'
const PATH_ACTIONS_DEV = 'env/actions.development.json'

const getEnv = (short) => {
  const env = nconf.get('NODE_ENV')
  if (short && env === ENV_DEV) {
    return 'dev'
  } else if (short && env === ENV_PROD) {
    return 'prod'
  }
  return env
}

const loadNConf = () => {
  let configDir = PATH_DEV
  let actionConfigDir = PATH_ACTIONS_DEV
	// Loads environment variables
  nconf.argv().env()
  const nodeEnv = nconf.get('NODE_ENV')

  if (nodeEnv === ENV_DEV) {
    configDir = path.join(configPath, PATH_DEV)
    actionConfigDir = path.join(configPath, PATH_ACTIONS_DEV)
  } else if (nodeEnv === ENV_PROD) {
    configDir = path.join(configPath, PATH_PROD)
  }

  nconf.file('hub', { file: `${configDir}` })
  nconf.file('action', { file: `${actionConfigDir}` })
  nconf.defaults(mainConfig)
  console.log('DB Config ', nconf.get('database'))
  // Method overriding
  nconf.getEnv = getEnv

  return nconf
}

export default loadNConf()
