import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/css/style.css'

Vue.use(Router)
Vue.use(ElementUI)

const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {title: '登录'}
  }
]
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
