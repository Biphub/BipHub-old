import path from 'path'
import rucksack from 'rucksack-css'

module.exports = {
  port: 8080,
  title: 'bipflow',
  publicPath: '/',
  // Core config
  web: {
    bodyLimit: '100kb',
    corsHeaders: ['Link']
  },
  // Core config
  database: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '.database/sqlite/biphub-dev.sqlite3')
    },
    debug: false
  },
  // Frontend Config
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
  cssModules: false
}
