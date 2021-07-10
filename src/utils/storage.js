export const slack = 'slack_app_'
export const AUTH_KEY = slack + 'auth'

export const AUTH_TOKEN = slack + 'token'

export const save = (key, data = null) => {
  return window.localStorage.setItem(key, JSON.stringify(data))
}

export const get = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const remove = (key) => {
  return window.localStorage.removeItem(key)
}

export const clear = () => {
  window.localStorage.clear()
}