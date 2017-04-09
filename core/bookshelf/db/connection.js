import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'
import root from '../../helpers/root'

const init = () => {
  if (typeof root.bookshelf === 'undefined') {
    // TODO: Check if it needs config
    console.log('DB! ', config.get('database'))
    root.knex = Knex(config.get('database'))
    root.bookshelf = Bookshelf(root.knex)
    root.bookshelf.plugin('registry')
  }
  return {
    knex: root.knex,
    bookshelf: root.bookshelf
  }
}

export default init
