import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/css/style.css'

Vue.use(Router)
Vue.use(ElementUI)

const routes = []
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})

export default router
