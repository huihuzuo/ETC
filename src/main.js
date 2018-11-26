// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/'
import filters from './filters/filters'
import './assets/common.scss'
import './assets/index.scss'
import * as api from './store/api'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

Vue.config.productionTip = false

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import promise from 'es6-promise'

promise.polyfill()
Vue.prototype.$api = api
Vue.use(Element)

for (let key in filters) {
  Vue.filter(key, filters[key])
}
/* eslint-disable no-new */
const MyVue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

export default MyVue
