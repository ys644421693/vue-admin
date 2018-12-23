
// initial state
// shape: [{ id, quantity }]
const state = {
  gutter: '',
  type: '',
  justify: '',
  align: '',
  tag: '',
  cols: [{
    span: '',
    offset: '',
    push: '',
    pull: '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    tag: ''
  }]
}

// getters
const getters = {
  getGutter: (state, getters, rootState, rootGetters) => {
    return state.gutter
  },
  getType: (state, getters, rootState, rootGetters) => {
    return state.type
  },
  getJustify: (state, getters, rootState, rootGetters) => {
    return state.justify
  },
  getAlign: (state, getters, rootState, rootGetters) => {
    return state.align
  },
  getTag: (state, getters, rootState, rootGetters) => {
    return state.tag
  },
  getCols: (state, getters, rootState, rootGetters) => {
    return state.cols
  }
}

// actions
const actions = {
  setGutter ({ commit, state }, value) {
    commit('setElGutter', value)
  },
  setType ({ commit, state }, value) {
    commit('setElType', value)
  },
  setJustify ({ commit, state }, value) {
    commit('setElJustify', value)
  },
  setAlign ({ commit, state }, value) {
    commit('setElAlign', value)
  },
  setTag ({ commit, state }, value) {
    commit('setElTag', value)
  },
  setCols ({ commit, state }, value) {
    commit('setElCols', value)
  }
}

// mutations
const mutations = {
  setElGutter (state, value) {
    state.gutter = value
  },
  setElType (state, value) {
    state.type = value
  },
  setElJustify (state, value) {
    state.justify = value
  },
  setElAlign (state, value) {
    state.align = value
  },
  setElTag (state, value) {
    state.tag = value
  },
  setElCols (state, value) {
    state.cols = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
