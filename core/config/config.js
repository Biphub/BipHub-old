import nconf from 'nconf'
import path from 'path'

const loadNConf = () => {
  const configPath = __dirname
  const ENV_DEV = 'development'
  const ENV_PROD = 'production'
  const PATH_DEV = 'env/config.development.json'
  const PATH_PROD = 'env/config.production.json'
  const PATH_ACTIONS_DEV = 'env/actions.development.json'
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

	// Loads configs
  nconf.file('hub', { file: `${configDir}` })
  nconf.file('action', { file: `${actionConfigDir}` })
  nconf.file('web', { file: `${configDir}web.json` })
  return nconf
}

export default loadNConf()
