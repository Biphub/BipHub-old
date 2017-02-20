import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'

let bookshelf = null
let knex = null

const init = () => {
  if (!bookshelf) {
    knex = Knex(config.get('database'))
    bookshelf = Bookshelf(knex)
    return {
      knex,
      bookshelf,
    }
  }
}

export default init()
