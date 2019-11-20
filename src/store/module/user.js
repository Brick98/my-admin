import { login, authoriztion } from '@/api/user'
import { setToken } from '@/lib/util'
const state = {
  userName: '小张'
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  }
}
const actions = {
  login ({ commit }, { userName, password }) {
    return new Promise((resolve, reject) => {
      login({ userName, password })
        .then(res => {
          if (res.code === 200 && res.data.token) {
            console.log(res.data.token)
            setToken(res.data.token)
            resolve()
          } else {
            reject(new Error('error'))
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  authoriztion ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authoriztion()
        .then(res => {
          if (parseInt(res.code) === 401) {
            reject(new Error('token error'))
          } else {
            setToken(res.data.token)
            // resolve(res.data.rules.page)
            resolve(res.data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout () {
    setToken('')
  }
}
export default {
  state,
  getters,
  mutations,
  actions,
  modules: {}
}
