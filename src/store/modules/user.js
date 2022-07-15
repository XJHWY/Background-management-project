import { loginApi } from '@/api/login'
import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
const state = {
  token: getToken() || null
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  removeToken (state) {
    state.token = null
  }
}
const actions = {
  async login (context, data) {
    const res = await loginApi(data)
    console.log(res)
    context.commit('setToken', res.data.data.token)
    setToken(res.data.data.token)
    setTime(Date.now())
  },
  async logout (context) {
    context.commit('removeToken')
    removeToken()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
