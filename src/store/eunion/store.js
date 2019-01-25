import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './type'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    baseUrl: 'http://localhost:8011/sys/'
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    }
  }
})
