import { loginApi } from '@/api/login'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  }
}
const actions = {
  async login (context, data) {
    const res = await loginApi(data)
    console.log(res)
    context.commit('setToken', res.data.data.token)
    setToken(res.data.data.token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
