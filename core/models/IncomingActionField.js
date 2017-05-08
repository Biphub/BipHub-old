import _ from 'lodash';
import Q from 'q';
import base from './base';
import db from '../bookshelf';
import schemaUtils from '../bookshelf/schemaUtils';

const { bookshelf } = db;
const tableName = 'incoming_action_fields';

const IncomingActionField = base.extend({
  tableName,
  IncomingAction () {
    return this.belongsTo('IncomingAction');
  }
}, {
  attributes: schemaUtils.getAttributes(tableName),
	/**
   * Creates many incoming actions
	 * @param fields
	 * @param incomingActionId
	 * @returns {Promise.<*>}
	 */
  async createMany ({ fields, incomingActionId }) {
    const fns = [];
    _.forOwn(fields, (field) => {
      field.incoming_action_id = incomingActionId;
      fns.push(this.create(field));
    });
    return Q.all(fns);
  }
});

const IncomingActionFields = bookshelf.Collection.extend({
  model: IncomingActionField
});

export default {
  single: bookshelf.model('IncomingActionField', IncomingActionField),
  collection: bookshelf.collection('IncomingActionFields', IncomingActionFields)
};
