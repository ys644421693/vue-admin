
// initial state
// shape: [{ id, quantity }]
const state = {
  isOpenNav: false,
  component: 'PageFramework',
  componentAttr: 'PageFrameworkAttr'
}

// getters
const getters = {
  getOpenNav: (state, getters, rootState, rootGetters) => {
    return state.isOpenNav
  },
  getComponent: (state, getters, rootState, rootGetters) => {
    return state.component
  },
  getComponentAttr: (state, getters, rootState, rootGetters) => {
    return state.componentAttr
  }
}

// actions
const actions = {
  setOpenNav ({ commit, state }, value) {
    commit('setRootOpen', value)
  },
  setComponent ({ commit, state }, value) {
    commit('setRootComponent', value)
  },
  setComponentAttr ({ commit, state }, value) {
    commit('setRootComponentAttr', value)
  }
}

// mutations
const mutations = {
  setRootOpen (state, value) {
    state.isOpenNav = value
  },
  setRootComponent (state, value) {
    state.component = value
  },
  setRootComponentAttr (state, value) {
    state.componentAttr = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
