import Vue from 'vue'
import Vuex from 'vuex'
import AppModule from './App'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    AppModule
  },
  strict: debug
})

export default store
