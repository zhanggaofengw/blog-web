import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
const PublishArticles = (resolve) => {
  import('@/components/publish-articles/publish-articles').then((module) => {
    resolve(module)
  })
}
const UserManage = (resolve) => {
  import('@/components/user-Manage/user-Manage').then((module) => {
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
  },
  {
    path: '/userManage',
    component: UserManage,
    meta: {title: '用户管理'}
  },
  {
    path: '/publishArticles/:addOrUpdate/:id',
    component: PublishArticles,
    meta: {title: '发布文章', activeMenu: '/articleManage'}
  }
]
const router = new Router({
  base: '/blogWeb/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
})

export default router
