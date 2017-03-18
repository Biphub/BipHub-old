import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import http from 'http'
import path from 'path'
import config from './config'
import middleware from './middleware'
import controllers from './controllers'
import './models'
import './logger'

// Initiating express
const app = express()
const server = http.Server(app)
const viewPath = path.join(__dirname, 'views')
const hbs = exphbs({
  layoutsDir: viewPath,
  extname: '.hbs',
})
app.server = server

// Express configuration
app.set('port', config.get('web:port') || 3000)
app.set('views', viewPath)
app.set('view engine', 'handlebars')

// view engine
app.engine('html', hbs)

// static files
// app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('web:corsHeaders'),
}))

app.use(bodyParser.json({
  limit: config.bodyLimit,
}))

// internal middleware
app.use(middleware())

// Setup controllers
controllers(app)

/**
 * Start Express server.
 * TODO: Instead of callback try incorporating promises using bluebird.js
 */
server.listen(app.get('port'), '0.0.0.0', () => {
  console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
  console.log('  Press CTRL-C to stop\n')
})

export default app
