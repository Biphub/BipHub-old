const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport('http://localhost:8080/graphql')
})

export default {
  loadApps ({ commit }) {
    client.query(`
      query {
        apps {
          id
          name
          auth_type
          active
        }
      }
    `).then(result => {
      commit('LOAD_APPS', result)
    })
  }
}
