import axios from "axios";
import * as storage from './storage'

// Reusable API url
const apiUrl = 'http://206.189.91.54//api/v1/'

// GET request data from api
export const get = (url, config = false) => {
  let header = {}
  if (config === true) {
    header = storage.get(storage.AUTH_TOKEN) // if api request need a token set to true false if not needed
  }
  const res = axios.get(`${apiUrl}/${url}`, { headers: header }) // getting result from api
    .then((res) => {
      return res.data
    }).catch((err) => {
      return err.response.data
    })
  return res
}

// POST request data to api
export const post = (url, data = {}, config = false) => {
  let header = {}
  if (config === true) {
    header = storage.get(storage.AUTH_TOKEN) // if api request need a token set to true false if not needed
    header = { ...header, cors: "no-cors", id: 34 }
  }
  const res = axios.post(`${apiUrl}/${url}`, data, {
    headers: header
  }).then((res) => {
    // save token to local storage when user is login
    if (url === 'auth/sign_in') {
      // delete some unnecessary and save to local storage
      delete res.headers['cache-control']
      delete res.headers['content-type']
      delete res.headers['token-type']
      storage.save(storage.AUTH_TOKEN, { ...res.headers, id: res.data.data.id }) // Save token to local storage
    }
    return res.data
  }).catch((err) => {
    return err.response.data
  })
  return res
}

