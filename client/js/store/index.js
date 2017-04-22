import Vue from 'vue'
import Vuex from 'vuex'
import HomeModule from './Home'
import BipEditorModule from './BipEditor'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    HomeModule,
    BipEditorModule
  }
})

export default store
