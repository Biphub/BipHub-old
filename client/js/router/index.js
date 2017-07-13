import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage'
import BipEditorPage from '../pages/BipEditorPage'
import RegistryPage from '../pages/RegistryPage'

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
      path: '/bip/editor',
      component: BipEditorPage,
    },
    {
      path: '/registry',
      component: RegistryPage,
    }
  ],
})
