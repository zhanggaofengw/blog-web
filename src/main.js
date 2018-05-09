// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/js/http'
import store from './store'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
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
