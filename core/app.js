// Express requirements
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import path from 'path'
import { buildSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'
import db from './bookshelf'
import config from './config'
import middleware from './middleware'
import controllers from './controllers'
import './models'
import './logger'

// Webpack requirements
import webpack from 'webpack'
import webpackConfig from '../build/webpack.dev'
import clientConfig from '../build/config'
import WebpackLogPlugin from '../build/log-plugin'

// Initiating express
const app = express()
const server = http.Server(app)
const port = config.get('web:port') || 3000
app.server = server
app.set('port', port)

// Webpack requirements
if (config.getEnv(true) === 'dev') {
  webpackConfig.entry.client = [
    `webpack-hot-middleware/client?reload=true`,
    webpackConfig.entry.client
  ]
  webpackConfig.plugins.push(new WebpackLogPlugin(port))

  let compiler

  try {
    compiler = webpack(webpackConfig)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }

  const devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })
  app.use(devMiddleWare)
  app.use(require('webpack-hot-middleware')(compiler, {
    log: () => {}
  }))

  const mfs = devMiddleWare.fileSystem
  const file = path.join(webpackConfig.output.path, 'index.html')

  devMiddleWare.waitUntilValid()

  app.get('*', (req, res) => {
    devMiddleWare.waitUntilValid(() => {
      const html = mfs.readFileSync(file)
      res.end(html)
    })
  })

}
/*
// Express configuration
app.set('views', viewPath)
app.set('view engine', 'handlebars')

// static files
// app.use('/static', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.get('web:corsHeaders')
}))

app.use(bodyParser.json({
  limit: config.bodyLimit
}))

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!'
}
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// internal middleware
app.use(middleware())

// Runs latest migration
db.migrate().then(() => {
	// Setup controllers
  controllers(app)

  server.listen(app.get('port'), '0.0.0.0', () => {
    console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
    console.log('  Press CTRL-C to stop\n')
  })
})
*/
server.listen(app.get('port'), '0.0.0.0', () => {
  console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
  console.log('  Press CTRL-C to stop\n')
})
export default app
