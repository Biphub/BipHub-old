// General config file
import path from 'path'
import rucksack from 'rucksack-css'
const defaultPort = 8080

module.exports = {
  /**
   * BACKEND CONFIGS
   */
  port: defaultPort,
  // Currently forwardedPort and URL are not being used
  forwardedPort: process.env.FORWARDED_PORT || defaultPort,
  // Core server URL. Default to SERVER_URL env variable
  url: process.env.SERVER_URL || 'localhost',
  // Core config
  web: {
    bodyLimit: '100kb',
    corsHeaders: ['Link']
  },
  // Core config
  database: {
    production: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '.database/sqlite/biphub-dev.sqlite3')
      },
      debug: false
    },
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '.database/sqlite/biphub-dev.sqlite3')
      },
      debug: false
    },
    test: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      },
      debug: true
    }
  },
  /**
   * FRONTEND CONFIGS
   */
  title: 'bipflow',
  publicPath: '/',
  babel: {
    babelrc: true
  },
  postcss: [
    // add prefix via postcss since it's faster
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('postcss-nested'),
    rucksack()
  ],
  cssModules: true
}
