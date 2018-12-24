
// initial state
// shape: [{ id, quantity }]
const state = {
  gutter: 0,
  type: '',
  justify: '',
  align: '',
  tag: '',
  cols: [{
    id: 1,
    span: 24,
    offset: 0,
    push: 0,
    pull: 0,
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
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
  },
  addCol ({ commit }) {
    commit('addElCols')
  },
  removeCols ({ commit, state }, value) {
    commit('removeElCols', value)
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
  },
  addElCols (state) {
    var col = {
      id: 1,
      span: 1,
      offset: 0,
      push: 0,
      pull: 0,
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      tag: ''
    }
    var id = 0
    let count = 0
    for (let temp of state.cols) {
      if (temp.id > id) {
        id = temp.id
      }
      count = count + temp.span + temp.offset + temp.push + temp.pull
    }
    col.id = id + 1
    col.span = 24 - count
    state.cols.push(col)
    return state.cols
  },
  removeElCols (state, id) {
    for (var index = state.cols.length - 1; index > 0; index--) {
      if (state.cols[index].id === id) {
        state.cols.splice(index, 1)
        break
      }
    }
    return state.cols
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
