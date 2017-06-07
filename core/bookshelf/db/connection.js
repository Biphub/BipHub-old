import Knex from 'knex'
import Bookshelf from 'bookshelf'
import config from '../../config'
import root from '../../helpers/root'

if (typeof root.bookshelf === 'undefined') {
	// TODO: Check if it needs config
  let dbConfig = config.get('database')
  root.knex = Knex(dbConfig)

  if (dbConfig.client === 'sqlite3' && !fs.existsSync(dbConfig.connection.filename)) {
    let dbClient = require('sqlite3').verbose()
    let connection = new dbClient.Database(dbConfig.connection.filename)
    let fs = require('fs')
    let sql = fs.readFileSync('core/bookshelf/create.sql').toString()
    root.knex.raw(sql).then(function (resp) {})
    connection.close()
  }

  root.bookshelf = Bookshelf(root.knex)
  root.bookshelf.plugin('registry')
}

export default {
  knex: root.knex,
  bookshelf: root.bookshelf
}
