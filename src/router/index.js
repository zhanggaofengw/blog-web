import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = resolve => require(['@/components/login/login'], resolve)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    name: '登录'
  }
]
const router = new Router({
  base: '/blogWeb/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})

export default router
