import Vue from 'vue'
import Vuex from 'vuex'
import framework from './frameworkModule'
import root from './rootModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {framework, root}
})
