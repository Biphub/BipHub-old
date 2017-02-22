import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import SocketIO from 'socket.io'
import api from './controllers/api'
import html from './controllers/html'
import webhook from './controllers/webhooks'
import SocketServer from './controllers/SocketServer'
import bipAdapter from './adapter'
import config from './config'
import middleware from './middleware'
import Models from './models'
// Initiating express
const app = express()
const server = http.Server(app)
const io = SocketIO(server)
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
app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('web:corsHeaders'),
}))

app.use(bodyParser.json({
  limit: config.bodyLimit,
}))

// internal middleware
app.use(middleware())

// Models initiates DB

// console.log(models)
// html router
app.use('/', html())

new Models.Bips({ name: 'testing yo', description: 'lol' }).save().then((d) => {
  console.log(d)
})
// api router
app.use('/api', api())

app.use('/webhook', webhook())

// Initializes hub with socket io
bipAdapter.initialize(io)

// Handles socket connections
// Rooms:
// 1. /bips -> Handles bips connections
SocketServer.handleConnections(io)

/**
 * Start Express server.
 * TODO: Instead of callback try incorporating promises using bluebird.js
 */
server.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
  console.log('  Press CTRL-C to stop\n')
})


export default app
