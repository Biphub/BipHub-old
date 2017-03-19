import path from 'path'
import knexConfig from './knexfile'
import db from './db/connection'

// Assigns migration and seed directory path for Knex
const migrationConfig = Object.assign(knexConfig, { directory: path.join(__dirname, 'migrations'), debug: false })
const seedConfig = { directory: path.join(__dirname, 'seeds'), debug: false }
const connection = db()
const { knex, bookshelf } = connection

// NOTE: use ES5 syntax until you find out how to run knex-cli using ES6 syntax
// TODO, check it runs only once
knex.migrate.latest(migrationConfig)
	.then(() => knex.seed.run(seedConfig))
	.then(() => console.log('migration complete2!'))

export default bookshelf
