import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE](state, collapse) {
    state.collapse = collapse
  },
  [types.SET_ROLEMENU](state, list) {
    state.roleMenu = list
  },
  [types.SET_ROUTES](state, list) {
    state.routes = list
  }
}

export default mutations
