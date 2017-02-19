import knex from 'knex'
import config from '../config'

const getKnexInstance = () => {
  let knexInstance = null

  if (!knexInstance && config.get('database') && config.get('database').client) {
    knexInstance = knex(config.get('database'))
  }
  return knexInstance
}

export default getKnexInstance()
