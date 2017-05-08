import _ from 'lodash';
import destroyTable from './02.destroyTable';

/**
 * Destroy a schema from database
 * @param knex
 * @param schema
 * @returns {Array}
 */
const destroySchema = ({ knex, schema }) => {
  const forgedQueries = [];
  _.forOwn(schema, (table, tableName) => {
    forgedQueries.push(
      destroyTable(knex, tableName, table)
    );
  });
  return forgedQueries;
};

export default destroySchema;
