import * as types from './mutation-types'
import {menuFilter} from '../common/js/menuFilter'

function setRouter(list) {
  let home = [
    {
      path: '/home',
      component: resolve => require(['@/components/home/home'], resolve),
      name: '首页',
      children: []
    }
  ]
  let menu = []
  list.forEach((item) => {
    let component = item.component
    item.component = resolve => require([`@/components/${component}/${component}`], resolve)
    if (item.pid && item.pid !== 0) {
      menu.push(item)
      list.forEach((i) => {
        if (item._id === i.spid) {
          if (!item.children) {
            item.children = []
          }
          item.children.push(i)
        }
      })
    }
  })
  home[0].children = menu
  return home
}

export const addRouterAndMenu = function ({commit}, {menuList}) {
  let list = menuFilter(menuList)
  let routerList = setRouter(menuList)
  commit(types.SET_ROLEMENU, list)
  commit(types.SET_ROUTES, routerList)
}
