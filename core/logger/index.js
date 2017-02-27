const winston = require('winston')
// Requiring `winston-sqlire` will expose `winston.transports.SQLite`
import 'winston-sqlite3'

winston.add(winston.transports.SQLite3, {
  database: null,
  user: null,
  password: null,
  filename: 'content/data/biphub-dev.sqlite3',
  tableName: 'Logs',
})

winston.log('info', 'Hello distributed log files!')
winston.info('Hello again distributed logs')
winston.info('new stuff')