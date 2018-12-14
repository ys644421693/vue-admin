import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions/frameworkActions'
import * as getters from './getters/frameworkGetters'
import * as mutations from './mutations/frameworkMutation'

Vue.use(Vuex)
const state = {
  frameworkAttr: {}
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
