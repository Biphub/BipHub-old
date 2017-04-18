import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'
import schema from '../../../bookshelf/schema'
import createArgs from '../../../bookshelf/schemaBuilder/graphql/createArgs'

// Single
const AppType = new GraphQLObjectType({
  name: 'App',
  description: 'This represents an App',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (app) {
          return app.get('id') // Node.js
        }
      },
      name: {
        type: GraphQLString,
        resolve (app) {
          return app.get('name')
        }
      },
      auth_type: {
        type: GraphQLString,
        resolve (app) {
          return app.get('auth_type')
        }
      },
      active: {
        type: GraphQLBoolean,
        resolve (app) {
          return app.get('active')
        }
      },
      label: {
        type: GraphQLString,
        resolve (app) {
          return app.get('label')
        }
      },
      icon: {
        type: GraphQLString,
        resolve (app) {
          return app.get('icon')
        }
      },
      instructions: {
        type: GraphQLString,
        resolve (app) {
          return app.get('instructions')
        }
      },
      description: {
        type: GraphQLString,
        resolve (app) {
          return app.get('description')
        }
      }
    }
  }
})

export default AppType
