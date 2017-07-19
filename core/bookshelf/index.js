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
    bookshelf.knex.migrate.latest(migrationConfig).then(() => {
      return res(bookshelf)
    })
  })
}

function clean(bookshelf) {
  return new Future((rej, res) => {
    knexCleaner.clean(bookshelf.knex).then(() => {
      return res(bookshelf)
    })
  })
}

function init() {
  return new Future((rej, res) => {
    console.log('initing database!!')
    if (typeof root.bookshelf === 'undefined') {
      // TODO: Check if it needs config
      root.knex = Knex(config.get('database'))
      root.bookshelf = Bookshelf(root.knex)
      root.bookshelf.plugin('registry')
      return res(root.bookshelf)
    }
  })
}

function migrate() {
  console.log('migrating using ramda!')
  return R.compose(
    R.chain(migrateLatest),
    R.chain(clean),
    init
  )
}

/*
async function migrate() {
  await knexCleaner.clean(knex)
  await knex.migrate.latest(migrationConfig)
  if (process.env.NODE_ENV === 'test') {
	  await knex.seed.run(seedConfig)
  }
  return true
}
*/

export default {
  migrate,
}
