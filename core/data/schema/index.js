import bip from './bips.schema'

async function createTables() {
	// Creates table
  await bip.createTable()
}

export default {
  createTables,
}
