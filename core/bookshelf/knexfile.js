const coreConfig = require('../../config')

// TODO: Refactor below of think about removing knexfile completely
module.exports = {
  development: coreConfig.database.development,
  production: coreConfig.database.production,
  test: coreConfig.database.test
}
