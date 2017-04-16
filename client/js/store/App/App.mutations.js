export default {
  LOAD_APPS (state, { result }) {
    console.log('loading apps in mutation! state: ', state, '  new apps: ', result)
    state.apps = result.apps
  }
}
