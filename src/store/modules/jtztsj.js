import { CHOOSE_ID } from '../mutation-types'

// initial state
const state = {
  chooseId: ''
}

// getters
const getters = {
  chooseId: state => state.chooseId
}

// actions
const actions = {
  chooseId ({commit, state}, bool) {
    commit(CHOOSE_ID, bool)
  }
}

// mutations
const mutations = {
  [CHOOSE_ID] (state, bool) {
    state.chooseId = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
