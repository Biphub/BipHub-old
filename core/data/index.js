import schema from './schema'

const init = () => {
  console.log('testing!')
  schema.createTables()
}

export default {
  init,
}
