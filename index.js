const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'production') {
  require('babel-polyfill')
  console.log('Implement it')
} else if (NODE_ENV === 'development') {
  require('babel-register')
  require('babel-polyfill')
  require('./core/server')
}
