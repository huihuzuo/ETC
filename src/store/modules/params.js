/**
 * @desc 参数记录store
 */

import {
  SET_QUERY_PARAMES, // 查询模块查询form表单参数
  SET_RESULT_PARAMES // 查询模块查询结果参数
} from '../mutation-types'

// initial state
const state = {
  queryParams: null,
  resultParams: null
}

// getters
const getters = {
  queryParams: state => state.queryParams,
  resultParams: state => state.resultParams
}

// actions
const actions = {
  actionQueryParams ({commit, state}, param) {
    commit(SET_QUERY_PARAMES, param)
  },
  actionResultParams ({commit, state}, param) {
    commit(SET_RESULT_PARAMES, param)
  }
}

// mutations
const mutations = {
  [SET_QUERY_PARAMES] (state, data) {
    state.queryParams = data
  },
  [SET_RESULT_PARAMES] (state, data) {
    state.resultParams = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
