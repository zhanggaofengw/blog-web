// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/js/http'
import store from './store'
import ElementUI from 'element-ui'
// 引入 ECharts 基础模块
import echarts from 'echarts/lib/echarts'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/style.css'
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.echarts = echarts
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  window.document.title = to.name
  if ((!sessionStorage.getItem('userName') || sessionStorage.getItem('userName') === ' ') && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
