const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const client = new Lokka({
  transport: new Transport('http://localhost:8080/graphql')
})

export default {
  /**
   * Homepage load apps
   * @param commit
   */
  home_loadApps ({ commit }) {
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
  },
  bipEditor_loadApps ({ commit }) {
    client.query(`
      query {
        apps {
          id
          name
          active
          icon
        }
      }
    `).then(result => {
      commit('LOAD_APPS', ({ result }))
    })
  }
}
