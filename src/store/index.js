import Vue from 'vue'
import Vuex from 'vuex'

import jtztsj from './modules/jtztsj'
import map from './modules/map'
import params from './modules/params'
import panel from './modules/panel'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    jtztsj,
    map,
    params,
    panel
  }
})
