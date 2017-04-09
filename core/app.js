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
import vuepackMiddleware from './middleware/vuepack'

// Initiating express
const app = express()
const server = http.Server(app)
const port = config.get('web:port') || 3000
app.server = server
app.set('port', port)

// Webpack requirements
vuepackMiddleware(app)

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
  controllers(app)

  server.listen(app.get('port'), '0.0.0.0', () => {
    console.log('%s App is running at http://localhost:%d in %s mode ', app.get('port'))
    console.log('  Press CTRL-C to stop\n')
  })
})
export default app
