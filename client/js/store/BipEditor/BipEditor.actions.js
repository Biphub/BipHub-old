const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport(`http://${process.env.SERVER_URL}:${process.env.FORWARDED_PORT}/graphql`)
})

export default {
  /**
   * Homepage load apps
   * @param commit
   */
  bip_editor_inital_load ({ commit }) {
    client.query(`
      query {
        apps {
          id
          name
          icon
        }
      }
    `).then(result => {
      commit('LOAD_APPS', { result })
    })
  }
}
