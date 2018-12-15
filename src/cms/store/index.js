import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions/frameworkActions'
import * as getters from './getters/frameworkGetters'
import * as mutations from './mutations/frameworkMutation'

Vue.use(Vuex)
const state = {
  frameworkAttr: {
    height: '',
    layoutValue: '',
    directionValue: '',
    width: '',
    heightBottom: ''
  }
}
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
