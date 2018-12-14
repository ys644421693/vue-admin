import * as frameworkActions from '../actions/frameworkActions'
import * as frameworkGetters from '../getters/frameworkGetters'
import * as frameworkMutation from '../mutations/frameworkMutation'

export default {
  state: {frameworkAttr: {data: {}, attr: {}}},
  mutations: {frameworkMutation},
  actions: {frameworkActions},
  getters: {frameworkGetters}
}
