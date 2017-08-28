import root from '../helpers/root'
import R from 'ramda'
import Fantasy from 'ramda-fantasy'
import Knex from 'knex'
import Bookshelf from 'bookshelf'
import path from 'path'
import knexCleaner from 'knex-cleaner'
import knexConfig from './knexfile'
import config from '../../config'
// import db from './db/connection'
const Future = Fantasy.Future

// Assigns migration and seed directory path for Knex
const migrationConfig = Object.assign(knexConfig, { directory: path.join(__dirname, 'migrations'), debug: false })
const seedConfig = { directory: path.join(__dirname, 'seeds'), debug: true }
// const connection = db()
// const { knex, bookshelf } = connection

function migrateLatest(bookshelf) {
  return new Future((rej, res) => {
    bookshelf.knex.migrate.latest(migrationConfig)
      .then((result) => {
        console.info('Migrate to latest ', result)
        return res(bookshelf)
      })
  })
}

function clean(bookshelf) {
  return new Future((rej, res) => {
    knexCleaner.clean(bookshelf.knex)
      .then((result) => {
        console.info('Result of clean ', result)
        return res(bookshelf)
      })
  })
}

function getBookshelf() {
  if (typeof root.bookshelf === 'undefined') {
    // TODO: Check if it needs config
    root.knex = Knex(config.database.development)
    root.bookshelf = Bookshelf(root.knex)
    root.bookshelf.plugin('registry')
    return root.bookshelf
  }
  return root.bookshelf
}

function init() {
  return new Future((rej, res) => {
    return res(getBookshelf())
  })
}


function migrate() {
  return R.compose(
    R.chain(migrateLatest),
    R.chain(clean),
    init
  )
}

export default {
  migrate: migrate(),
  bookshelf: getBookshelf(),
}
