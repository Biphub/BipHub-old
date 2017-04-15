import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

const IncomingActionType = new GraphQLObjectType({
  name: 'IncomingAction',
  description: 'This represents an incoming action (event)',
  fields: () => {
    return {
      /**
       * Unique id of an app
       */
      id: {
        type: GraphQLInt,
        resolve (incomingAction) {
          return incomingAction.get('id')
        }
      },
      /**
       * Type of incoming action / event (e.g. webhook, realtime)
       */
      type: {
        type: GraphQLString,
        resolve (incomingAction) {
          return incomingAction.get('type')
        }
      },
      /**
       * End point used for webhooks
       */
      endpoint: {
        type: GraphQLString,
        resolve (incomingAction) {
          return incomingAction.get('endpoint')
        }
      },
      /**
       * JSON Array object that represents conditions of this evnet
       */
      conditions: {
        type: GraphQLString,
        resolve (incomingAction) {
          return incomingAction.get('conditions')
        }
      },
      /**
       * Name of incoming action (event)
       */
      name: {
        type: GraphQLString,
        resolve (incomingAction) {
          return incomingAction.get('name')
        }
      }
    }
  }
})

export default IncomingActionType
