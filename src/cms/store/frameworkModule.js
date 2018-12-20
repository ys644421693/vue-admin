
// initial state
// shape: [{ id, quantity }]
const state = {
  height: '100px',
  layoutValue: 'header-main-vertical',
  width: '200px',
  heightBottom: '100px',
  data: {}
}

// getters
const getters = {
  frameworkAttrHeight: (state, getters, rootState, rootGetters) => {
    return state.height
  },
  frameworkAttrLayoutValue: (state, getters, rootState, rootGetters) => {
    return state.layoutValue
  },
  frameworkAttrDirectionValue: (state, getters, rootState, rootGetters) => {
    return state.directionValue
  },
  frameworkAttrWidth: (state, getters, rootState, rootGetters) => {
    return state.width
  },
  frameworkAttrHeightBottom: (state, getters, rootState, rootGetters) => {
    return state.heightBottom
  },
  frameworkAttrData: (state, getters, rootState, rootGetters) => {
    return state.data
  }
}

// actions
const actions = {
  frameworkHeightAction ({ commit, state }, value) {
    commit('setFrameworkHeight', value)
  },
  frameworkLayoutValueAction ({ commit, state }, value) {
    commit('setFrameworkLayoutValue', value)
  },
  frameworkWidthAction ({ commit, state }, value) {
    commit('setFrameworkWidth', value)
  },
  frameworkHeightBottomAction ({ commit, state }, value) {
    commit('setFrameworkHeightBottom', value)
  },
  frameworkDatahtAction ({ commit, state }, value) {
    commit('setFrameworkData', value)
  }
}

// mutations
const mutations = {
  setFrameworkHeight (state, value) {
    state.height = value
  },
  setFrameworkLayoutValue (state, value) {
    state.layoutValue = value
  },
  setFrameworkDirectionValue (state, value) {
    state.directionValue = value
  },
  setFrameworkWidth (state, value) {
    state.width = value
  },
  setFrameworkHeightBottom (state, value) {
    state.heightBottom = value
  },
  setFrameworkData (state, value) {
    state.data = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
