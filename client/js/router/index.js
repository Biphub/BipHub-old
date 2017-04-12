import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage'
import BipPage from '../pages/BipPage'

Vue.use(Router)

// TODO: Check history API availability, otherwise fallback to hash
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/bips',
      component: BipPage,
    },
  ],
})
