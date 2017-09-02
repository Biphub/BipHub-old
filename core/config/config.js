import nconf from 'nconf'
import path from 'path'
import defaultConfig from '../../config'

const configPath = __dirname
const ENV_DEV = 'development'
const ENV_PROD = 'production'
const PATH_DEV = 'env/config.development.json'
const PATH_PROD = 'env/config.production.json'
const PATH_ACTIONS_DEV = 'env/actions.development.json'

/**
 * Getting shortened version of configs
 * @param short
 * @returns {*}
 */
const getEnv = (short) => {
  const env = nconf.get('NODE_ENV')
  if (short && env === ENV_DEV) {
    return 'dev'
  } else if (short && env === ENV_PROD) {
    return 'prod'
  }
  return env
}

const getDbConfig = () => {
  const env = nconf.get('NODE_ENV')
  if (env === ENV_DEV) {
    return nconf.get('database:development')
  } else if (env === ENV_PROD) {
    return nconf.get('database:production')
  }
  return nconf.get('database:development')
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
  nconf.defaults(defaultConfig)
  // Method overriding
  nconf.getEnv = getEnv
  nconf.getDbConfig = getDbConfig

  return nconf
}

export default loadNConf()
