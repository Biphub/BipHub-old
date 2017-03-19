import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'
import root from '../../helpers/root'

const init = (seed) => {
  if (typeof root.bookshelf === 'undefined') {
    // Runs seed after creating DB tables
    const afterCreate = () => {
      if (config.getEnv(true) === 'dev') {
        seed()
      }
    }
    // Builds database config
    const databaseConfig = Object.assign(
      config.get('database'),
      {
        pool: {
          afterCreate,
        },
      },
    )
    console.log('db config ', databaseConfig)
    root.knex = Knex(databaseConfig)
    root.bookshelf = Bookshelf(root.knex)
  }
  return {
    knex: root.knex,
    bookshelf: root.bookshelf,
  }
}

export default init
