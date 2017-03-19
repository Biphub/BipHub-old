import path from 'path'
import knexConfig from './knexfile'
import db from './db/connection'

const migrationConfig = Object.assign(knexConfig, { directory: path.join(__dirname, 'migrations') })
const seedConfig = { directory: path.join(__dirname, 'seeds') }
const connection = db()
const { knex, bookshelf } = connection

knex.migrate.latest(migrationConfig)
	.then(() => knex.seed.run(seedConfig))
	.then(() => console.log('migration complete2!'))

export default bookshelf
