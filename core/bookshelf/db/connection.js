import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'


const init = () => {
  if (typeof global.bookshelf === 'undefined') {
    global.knex = Knex(config.get('database'))
    global.bookshelf = Bookshelf(global.knex)
  }
  return {
    knex: global.knex,
    bookshelf: global.bookshelf,
  }
}

export default init
