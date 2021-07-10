import axios from "axios";
import * as storage from './storage'

const apiUrl = 'http://206.189.91.54//api/v1/'
// 

export const get = (url, config = false) => {
  let header = {}
  if (config === true) {
    header = storage.get(storage.AUTH_TOKEN)
  }
  const res = axios.get(`${apiUrl}/${url}`, {
    headers: header
  })
    .then((res) => {
      return res.data
    }).catch((err) => {
      return err.response.data
    })
  return res
}

export const post = (url, data = {}, config = {}) => {
  const res = axios.post(`${apiUrl}/${url}`, data, {
    headers: config
  }).then((res) => {
    if (url === 'auth/sign_in') {
      delete res.headers['cache-control']
      delete res.headers['content-type']
      storage.save(storage.AUTH_TOKEN, res.headers)
    }
    return res.data
  }).catch((err) => {
    return err.response.data
  })
  return res
}

