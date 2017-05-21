import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

const ActionType = new GraphQLObjectType({
  name: 'IncomingAction',
  description: 'This represents an incoming action (event)',
  fields: () => {
    return {
      /**
       * Unique id of an app
       */
      id: {
        type: GraphQLInt,
        resolve (action) {
          return action.get('id')
        }
      },
      /**
       * Type of incoming action / event (e.g. webhook, realtime)
       */
      type: {
        type: GraphQLString,
        resolve (action) {
          return action.get('type')
        }
      },
      /**
       * End point used for webhooks
       */
      endpoint: {
        type: GraphQLString,
        resolve (action) {
          return action.get('endpoint')
        }
      },
      /**
       * JSON Array object that represents conditions of this evnet
       * TODO: Encode into JSON
       */
      conditions: {
        type: GraphQLJSON,
        resolve (action) {
          return action.get('conditions')
        }
      },
      /**
       * Name of incoming action (event)
       */
      name: {
        type: GraphQLString,
        resolve (action) {
          return action.get('name')
        }
      }
    }
  }
})

export default ActionType
