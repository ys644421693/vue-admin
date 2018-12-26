
// initial state
// shape: [{ id, quantity }]
const state = {
  small: false,
  background: false,
  pageSize: 10,
  total: 10,
  pageCount: 10,
  pagerCount: 7,
  currentPage: 1,
  layout: '',
  pageSizes: [],
  popperClass: '',
  prevText: '',
  nextText: '',
  disabled: false
}

// getters
const getters = {
  getSmall: (state, getters, rootState, rootGetters) => {
    return state.small
  },
  getBackground: (state, getters, rootState, rootGetters) => {
    return state.background
  },
  getPageSize: (state, getters, rootState, rootGetters) => {
    return state.pageSize
  },
  getTotal: (state, getters, rootState, rootGetters) => {
    return state.total
  },
  getPageCount: (state, getters, rootState, rootGetters) => {
    return state.pageCount
  },
  getPagerCount: (state, getters, rootState, rootGetters) => {
    return state.pagerCount
  },
  getCurrentPage: (state, getters, rootState, rootGetters) => {
    return state.currentPage
  },
  getLayout: (state, getters, rootState, rootGetters) => {
    return state.layout
  },
  getPageSizes: (state, getters, rootState, rootGetters) => {
    return state.pageSizes
  },
  getPopperClass: (state, getters, rootState, rootGetters) => {
    return state.popperClass
  },
  getPrevText: (state, getters, rootState, rootGetters) => {
    return state.prevText
  },
  getNextText: (state, getters, rootState, rootGetters) => {
    return state.nextText
  },
  getDisabled: (state, getters, rootState, rootGetters) => {
    return state.disabled
  }
}

// actions
const actions = {
  setSmall ({ commit, state }, value) {
    commit('setElSmall', value)
  },
  setBackground ({ commit, state }, value) {
    commit('setElBackground', value)
  },
  setPageSize ({ commit, state }, value) {
    commit('setElPageSize', value)
  },
  setTotal ({ commit, state }, value) {
    commit('setElTotal', value)
  },
  setPageCount ({ commit, state }, value) {
    commit('setElPageCount', value)
  },
  setPagerCount ({ commit, state }, value) {
    commit('setElPagerCount', value)
  },
  setCurrentPage ({ commit, state }, value) {
    commit('setElCurrentPage', value)
  },
  setLayout ({ commit }) {
    commit('setElLayout')
  },
  setPageSizes ({ commit, state }, value) {
    commit('setElPageSizes', value)
  },
  setPopperClass ({ commit, state }, value) {
    commit('setElPopperClass', value)
  },
  setPrevText ({ commit, state }, value) {
    commit('setElPrevText', value)
  },
  setNextText ({ commit, state }, value) {
    commit('setElNextText', value)
  },
  setDisabled ({ commit, state }, value) {
    commit('setElDisabled', value)
  }
}

// mutations
const mutations = {
  setElSmall (state, value) {
    state.small = value
  },
  setElBackground (state, value) {
    state.background = value
  },
  setElPageSize (state, value) {
    state.pageSize = value
  },
  setElTotal (state, value) {
    state.total = value
  },
  setElPageCount (state, value) {
    state.pageCount = value
  },
  setElPagerCount (state, value) {
    state.pagerCount = value
  },
  setElCurrentPage (state, value) {
    state.currentPage = value
  },
  setElLayout (state, value) {
    state.layout = value
  },
  setElPageSizes (state, value) {
    state.pageSizes = value
  },
  setElPopperClass (state, value) {
    state.popperClass = value
  },
  setElPrevText (state, value) {
    state.prevText = value
  },
  setElNextText (state, value) {
    state.nextText = value
  },
  setElDisabled (state, value) {
    state.disabled = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
