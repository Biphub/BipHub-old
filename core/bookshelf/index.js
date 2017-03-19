import cp from 'child_process'
import db from './db/connection'

const connection = db()

// Runs latest migration
// TODO: Fix debug logs
cp.exec('npm run knex:migrate')
// TODO: Run seed here programmatically

export default connection.bookshelf
