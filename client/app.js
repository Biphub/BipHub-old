import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './js/App.vue'
import router from './js/router'
import store from './js/store'
import ComponentsPlugin from './js/components'
sync(store, router)

import './styles/style.scss'
// TODO: Import different theme per setting
import './styles/themes/theme1.scss'

const app = new Vue({
  router,
  store,
  ...App
})

Vue.use(ComponentsPlugin)

export { app, router, store }
