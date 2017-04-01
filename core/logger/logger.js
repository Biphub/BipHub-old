import winston from 'winston'
import 'winston-sqlite3'
import config from '../config'

const env = config.get('NDOE_ENV')

if (env === 'development') {
  winston.add(winston.transports.Console)
} else if (env === 'production') {
  winston.add(winston.transports.SQLite3, {
    database: null,
    user: null,
    password: null,
    filename: 'content/data/biphub-dev.sqlite3',
    tableName: 'Logs',
  })
}
winston.log('info', 'Hello distributed log files!')
winston.info('Hello again distributed logs')
winston.info('new stuff')

export default winston
