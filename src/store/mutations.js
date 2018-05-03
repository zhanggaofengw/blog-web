import * as types from './mutation-types'

const mutations = {
  [types.SET_COLLAPSE](state, collapse) {
    state.collapse = collapse
  }
}

export default mutations
