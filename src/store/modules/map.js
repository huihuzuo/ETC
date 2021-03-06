/**
 * @desc 地图及地图工具store
 */

import {
  SET_MAP_LOAD_STATE
} from '../mutation-types'

// initial state
const state = {
  loadMapSuccess: false
}

// getters
const getters = {
  loadMapSuccess: state => state.loadMapSuccess
}

// actions
const actions = {
  actionMapState ({commit, state}, param) {
    commit(SET_MAP_LOAD_STATE, param)
  }
}

// mutations
const mutations = {
  [SET_MAP_LOAD_STATE] (state, data) {
    state.loadMapSuccess = {
      id: Math.random(),
      data: data
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

