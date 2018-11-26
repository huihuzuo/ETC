/**
 * @desc 控制组件panel的显示与隐藏
 */

import {
  SET_PANEL_STATE
} from '../mutation-types'

// initial state
const state = {
  panelState: false
}

// getters
const getters = {
  panelState: state => state.panelState
}

// actions
const actions = {
  actionPanelState ({commit, state}, param) {
    commit(SET_PANEL_STATE, param)
  }
}

// mutations
const mutations = {
  [SET_PANEL_STATE] (state, data) {
    state.panelState = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
