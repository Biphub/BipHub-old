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
  home_initial_load ({ commit }) {
    client.query(`
      query {
        apps {
          id
          name
          active
          label
          description
          icon
        }
      }
    `).then(result => {
      commit('LOAD_APPS', { result })
    })
  }
}
