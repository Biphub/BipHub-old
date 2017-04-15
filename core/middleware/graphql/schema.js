import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Queries
import AppsList from './queries/list/AppsList'
import IncomingActionsList from './queries/list/IncomingActionsList'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',

  fields: () => {
    return {
      apps: AppsList,
      incomingActions: IncomingActionsList
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

export default Schema
