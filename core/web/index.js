import api from './controllers/api'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from '../config'
import express from 'express'
import http from 'http'
import html from './controllers/html'
import initializeDb from '../db'
import morgan from 'morgan'
import middleware from './middleware'
import path from 'path'

// Initiating express
let app = express();
app.server = http.createServer(app);

// Express configuration
app.set('port', config.get('web:port') || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// view engine
app.engine('html', require('hbs').__express);

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('web:corsHeaders')
}))

app.use(bodyParser.json({
  limit : config.bodyLimit
}))

// connect to db
// TODO: Find a way to refactor below
initializeDb( db => {

  // internal middleware
  app.use(middleware({ config, db }))

  // html router
  app.use('/', html({config, db}))

  // api router
  app.use('/api', api({ config, db }))

  /**
   * Start Express server.
   * TODO: Instead of callback try incorporating promises using bluebird.js
   */
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
    console.log('  Press CTRL-C to stop\n')
  })
})

export default app
