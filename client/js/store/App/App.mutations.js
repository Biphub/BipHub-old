export default {
  LOAD_APPS (state, apps) {
    console.log('loading apps in mutation! state: ', state, '  new apps: ', apps)
    state.apps = apps
  }
}
