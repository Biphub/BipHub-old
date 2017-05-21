import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

const OutgoingActionType = new GraphQLObjectType({
  name: 'OutgoingAction',
  description: 'This represents an outgoing action (outgoing event || action)',
  fields: () => {
    return {
      /**
       * Unique id of an app
       */
      id: {
        type: GraphQLInt,
        resolve (outgoingAction) {
          return outgoingAction.get('id')
        }
      },
      /**
       * Type of incoming action / event (e.g. webhook, realtime)
       */
      type: {
        type: GraphQLString,
        resolve (outgoingAction) {
          return outgoingAction.get('type')
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

export default OutgoingActionType
