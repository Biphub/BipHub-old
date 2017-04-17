const coreConfig = require('../../config')

// TODO: Refactor below of think about removing knexfile completely
module.exports = {
  development: coreConfig.database,
  staging: coreConfig.database,
  production: coreConfig.database
}
