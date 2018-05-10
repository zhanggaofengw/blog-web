import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/style.css'

Vue.use(Router)
Vue.use(ElementUI)

const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}
const ArticleManage = (resolve) => {
  import('@/components/article-manage/article-manage').then((module) => {
    resolve(module)
  })
}
const Label = (resolve) => {
  import('@/components/label/label').then((module) => {
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
  },
  {
    path: '/articleManage',
    component: ArticleManage,
    meta: {title: '文章管理'}
  },
  {
    path: '/label',
    component: Label,
    meta: {title: '分类/标签管理'}
  }
]
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})

export default router
