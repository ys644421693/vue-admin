
// initial state
// shape: [{ id, quantity }]
const state = {
  server: '',
  stripe: false,
  border: false,
  rowClass: [{key: '', className: ''}],
  height: '250',
  maxHeight: '400',
  isPagination: false,
  isCheckBox: false,
  columns: [{
    id: 1,
    prop: '',
    label: '',
    width: '',
    type: '',
    fixed: false,
    sortable: false
  }]
}

// getters
const getters = {
  getServer: (state, getters, rootState, rootGetters) => {
    return state.server
  },
  getStripe: (state, getters, rootState, rootGetters) => {
    return state.stripe
  },
  getBorder: (state, getters, rootState, rootGetters) => {
    return state.border
  },
  getRowClass: (state, getters, rootState, rootGetters) => {
    return state.rowClass
  },
  getHeight: (state, getters, rootState, rootGetters) => {
    return state.height
  },
  getMaxHeight: (state, getters, rootState, rootGetters) => {
    return state.maxHeight
  },
  getColumns: (state, getters, rootState, rootGetters) => {
    return state.columns
  },
  getIsPagination: (state, getters, rootState, rootGetters) => {
    return state.isPagination
  },
  getIsCheckBox: (state, getters, rootState, rootGetters) => {
    return state.isCheckBox
  }
}

// actions
const actions = {
  setStripe ({ commit, state }, value) {
    commit('setElStripe', value)
  },
  setServer ({ commit, state }, value) {
    commit('setElServer', value)
  },
  setBorder ({ commit, state }, value) {
    commit('setElBorder', value)
  },
  setRowClass ({ commit, state }, value) {
    commit('setElRowClass', value)
  },
  setHeight ({ commit, state }, value) {
    commit('setElHeight', value)
  },
  setMaxHeight ({ commit, state }, value) {
    commit('setElMaxHeight', value)
  },
  setColumns ({ commit, state }, value) {
    commit('setElColumns', value)
  },
  setIsPagination ({ commit, state }, value) {
    commit('setElIsPagination', value)
  },
  setIsCheckBox ({ commit, state }, value) {
    commit('setElIsCheckBox', value)
  },
  addCol ({ commit, state }, value) {
    commit('addElCol', value)
  },
  removeCols ({ commit, state }, value) {
    commit('removeElCols', value)
  }
}

// mutations
const mutations = {
  setElStripe (state, value) {
    state.stripe = value
  },
  setElServer (state, value) {
    state.stripe = value
  },
  setElBorder (state, value) {
    state.border = value
  },
  setElRowClass (state, value) {
    state.rowClass = value
  },
  setElHeight (state, value) {
    state.height = value
  },
  setElMaxHeight (state, value) {
    state.maxHeight = value
  },
  setElColumns (state, value) {
    state.columns = value
  },
  setElIsPagination (state, value) {
    state.isPagination = value
  },
  setElIsCheckBox (state, value) {
    state.isCheckBox = value
  },
  addElCol (state, value) {
    var newCol = {
      id: 1,
      prop: '',
      label: '',
      width: '',
      type: '',
      fixed: false
    }
    var id = 0
    for (let temp of state.columns) {
      if (temp.id > id) {
        id = temp.id
      }
    }
    newCol.id = id + 1
    state.columns.push(newCol)
  },
  removeElCols (state, id) {
    for (var index = state.columns.length - 1; index > 0; index--) {
      if (state.columns[index].id === id) {
        state.columns.splice(index, 1)
        break
      }
    }
    return state.columns
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
