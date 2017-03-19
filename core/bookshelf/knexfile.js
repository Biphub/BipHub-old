const path = require('path')
// Update with your config settings.
console.log('db file ', path.join(__dirname, '../../content/data/biphub-dev.sqlite3'))
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../../content/data/biphub-dev.sqlite3'),
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

}
