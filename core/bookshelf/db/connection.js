import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'
import root from '../../helpers/root'


const init = () => {
  if (typeof root.bookshelf === 'undefined') {
    root.knex = Knex(config.get('database'))
    root.bookshelf = Bookshelf(root.knex)
  }
  return {
    knex: root.knex,
    bookshelf: root.bookshelf,
  }
}

export default init
