import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './js/App.vue'
import router from './js/router'
import store from './js/store'
sync(store, router)

import './styles/style.scss'

// TODO: Import different theme per setting
import './styles/themes/theme1.scss'

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
