import config from '../config'

// TODO: Refactor below of think about removing knexfile completely
module.exports = {
  development: config.get('database:development'),
  production: config.get('database:production'),
  test: config.get('database:test')
}
