console.log('test')
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'production') {
  require('babel-polyfill')
  console.log('Implement it')
} else if (NODE_ENV === 'development') {
  // nodemon --trace-warnings -w core --exec \"babel-node\" index.js
  // require('babel-polyfill');
  require('./core/app')
  console.log('development mode!!')
}
