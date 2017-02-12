import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import exphbs from 'express-handlebars'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import api from './controllers/api'
import html from './controllers/html'
import config from '../../config'
import initializeDb from '../db'
import middleware from './middleware'

// Initiating express
const app = express()
const viewPath = path.join(__dirname, 'views')
const hbs = exphbs({
	layoutsDir: viewPath,
	extname: '.hbs',
})

app.server = http.createServer(app)

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

// connect to db
// TODO: Find a way to refactor below
initializeDb((db) => {
  // internal middleware
	app.use(middleware({ config, db }))

  // html router
	app.use('/', html({ config, db }))

  // api router
	app.use('/api', api({ config, db }))

  /**
   * Start Express server.
   * TODO: Instead of callback try incorporating promises using bluebird.js
   */
	app.listen(app.get('port'), () => {
		// console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
		// console.log('  Press CTRL-C to stop\n')
	})
	/*console.log('server instance')
	console.log(app.server)
	var server = require('http').createServer();
	var io = require('socket.io')(server);
	io.on('connection', function(client){
		client.on('event', function(data){});
		client.on('disconnect', function(){});
	})0;*/
	//server.listen(3000);
})
/*
setTimeout(() => {
	var socket = require('socket.io-client')('http://localhost:3000');
	socket.on('connect', function(){});
	socket.on('event', function(data){});
	socket.on('disconnect', function(){});
}, 3000)*/

export default app
