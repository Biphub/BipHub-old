import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

// Single
const AppType = new GraphQLObjectType({
  name: 'App',
  description: 'This represents an App',
  fields: () => {
    return {
      /**
       * Unique id of an app
       */
      id: {
        type: GraphQLInt,
        resolve (app) {
          return app.get('id') // Node.js
        }
      },
      /**
       * App name
       */
      name: {
        type: GraphQLString,
        resolve (app) {
          return app.get('name')
        }
      },
      /**
       * Authentication type such as token, oauth
       */
      auth_type: {
        type: GraphQLString,
        resolve (app) {
          return app.get('auth_type')
        }
      },
      /**
       * Determines if app is active or not
       */
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
