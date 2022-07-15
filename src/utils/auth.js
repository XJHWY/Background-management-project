import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设定一个独一无二的key
const TimeKey = 'times'
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getTime () {
  return Cookies.get(TimeKey)
}

export function setTime (time) {
  return Cookies.set(TimeKey, time)
}
