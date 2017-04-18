import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Queries
import AppsList from './queries/list/AppsList'
import IncomingActionsList from './queries/list/IncomingActionsList'
import OutgoingActionsList from './queries/list/OutgoingActionsList'
import schema from '../../bookshelf/schema'
import createArgs from '../../bookshelf/schemaBuilder/graphql/createArgs'
createArgs(schema.apps)

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',

  fields: () => {
    return {
      apps: AppsList,
      incomingActions: IncomingActionsList,
      outgoingActions: OutgoingActionsList
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
