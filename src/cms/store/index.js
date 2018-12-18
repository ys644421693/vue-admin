import Vue from 'vue'
import Vuex from 'vuex'
import framework from './frameworkModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { framework }
})
