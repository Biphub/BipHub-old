import path from 'path'
import knexCleaner from 'knex-cleaner'
import knexConfig from './knexfile'
import db from './db/connection'

// Assigns migration and seed directory path for Knex
const migrationConfig = Object.assign(knexConfig, { directory: path.join(__dirname, 'migrations'), debug: false })
// const seedConfig = { directory: path.join(__dirname, 'seeds'), debug: false }
const connection = db()
const { knex, bookshelf } = connection

async function migrate() {
  await knexCleaner.clean(knex)
  await knex.migrate.latest(migrationConfig)
	// .then(() => knex.seed.run(seedConfig))
	// .then(() => console.log('migration complete2!'))
  return true
}
export default {
  bookshelf,
  migrate,
}
