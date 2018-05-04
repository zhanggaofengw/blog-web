import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE](state, collapse) {
    state.collapse = collapse
  },
  [types.SET_ISLOGIN](state, isLogin) {
    state.isLogin = isLogin
  }
}

export default mutations
