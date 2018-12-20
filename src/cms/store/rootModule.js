
// initial state
// shape: [{ id, quantity }]
const state = {
  isOpenNav: true
}

// getters
const getters = {
  getOpenNav: (state, getters, rootState, rootGetters) => {
    return state.isOpenNav
  }
}

// actions
const actions = {
  setOpenNav ({ commit, state }, value) {
    commit('setRootOpen', value)
  }
}

// mutations
const mutations = {
  setRootOpen (state, value) {
    state.isOpenNav = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
