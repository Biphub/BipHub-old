import winston from 'winston'
import Tracer from 'tracer'
import 'winston-sqlite3'
import config from '../config'

let instance = null
const env = config.get('NODE_ENV')

if (env === 'development') {
  instance = Tracer.colorConsole({
    format: '{{file}}:{{line}} | {{message}}'
  })
} else if (env === 'production') {
  winston.add(winston.transports.SQLite3, {
    database: null,
    user: null,
    password: null,
    filename: 'content/data/biphub-dev.sqlite3',
    tableName: 'Logs'
  })
  instance = winston
}

export default instance
