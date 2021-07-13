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

export const post = (url, data = {}, config = false) => {
  let header = {}
  if (config === true) {
    header = storage.get(storage.AUTH_TOKEN)
    header = { ...header, cors: "no-cors", id: 34 }
  }
  const res = axios.post(`${apiUrl}/${url}`, data, {
    headers: header
  }).then((res) => {
    if (url === 'auth/sign_in') {
      delete res.headers['cache-control']
      delete res.headers['content-type']
      delete res.headers['token-type']
      storage.save(storage.AUTH_TOKEN, { ...res.headers, id: res.data.data.id })
    }
    return res.data
  }).catch((err) => {
    return err.response.data
  })
  return res
}

