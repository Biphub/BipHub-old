import {
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import OutgoingActionType from '../../types/OutgoingActionType';
import models from '../../../../models';

const OutgoingActionsQuery = {
  type: new GraphQLList(OutgoingActionType),
  args: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    }
  },
  resolve (root, args) {
    return models.OutgoingAction.findAll(args);
  }
};

export default OutgoingActionsQuery;
