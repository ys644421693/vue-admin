import Vue from 'vue'
import Vuex from 'vuex'
import framework from './frameworkModule'
import root from './rootModule'
import rowModule from './elRowModule'
import paginationModule from './elPaginationModule'
import elDataTable from './elDataTable'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {framework, root, rowModule, paginationModule, elDataTable}
})
