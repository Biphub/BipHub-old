import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'

let bookshelf = null
let knex = null

const init = () => {
	console.log('initiated bookshelf and knex! ', Boolean(knex) , ' bookshelf ', Boolean(bookshelf))
  if (!bookshelf) {
    console.log('initiated bookshelf and knex!')
    knex = Knex(config.get('database'))
    bookshelf = Bookshelf(knex)
    return {
      knex,
      bookshelf,
    }
  }
}

export default init()
