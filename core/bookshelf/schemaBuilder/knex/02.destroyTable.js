/**
 * Creates a table
 * @param knex
 * @param tableName
 * @returns {*}
 */
const destoryTable = (knex, tableName) => {
  return knex.schema.dropTableIfExists(tableName);
};

export default destoryTable;
