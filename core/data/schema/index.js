
function createTables(connection) {
  const { knex } = connection
	knex.schema.dropTable('Bips')
	knex.schema.dropTable('IncomingActions')
  knex.schema.createTableIfNotExists('Bips', (table) => {
    table.increments()
    table.string('name')
    table.string('description', 128)
    table.timestamps()
  }).then(id => Promise.resolve(id))
		.catch(err => Promise.reject(err))

	knex.schema.createTableIfNotExists('IncomingActions', (table) => {
		table.increments()
		table.string('name')
		table.string('description', 128)
		table.timestamps()
    //Only in sqlite
		table.dropIndex('bipId')
		table.bigInteger('bipId')
			.unsigned()
			.index()
			.references('id')
			.inTable('Bips')
	}).then(id => Promise.resolve(id))
		.catch(err => Promise.reject(err))

}

export default {
  createTables,
}
