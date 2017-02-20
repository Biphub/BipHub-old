import schema from './schema'

async function init() {
  await schema.createTables()
}

export default {
  init,
}
