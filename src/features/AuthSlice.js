import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'
import * as storage from '../utils/storage'

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (payload) => {
    const data = await axios.post('auth/sign_in', payload)
    return data
  }
)
//sadsad
export const createChannelAsync = createAsyncThunk(
  'channels/createChannelAsync',
  async (payload) => {
    const data = await axios.post('channels/', payload, true)
    return data
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuth: false,
    errors: [],
    authId: null
  },
  reducers: {
    clearState(state, action) {
      state.errors = []
      state.isAuth = false
      state.authId = null
      return state
    },
    getUser(state, action) {
      state.user = storage.get(storage.AUTH_KEY)
      state.errors = []
      if (state.user !== null) {
        state.isAuth = true
        state.authId = state.user.id
      } else {
        state.isAuth = false
        state.authId = null
      }
    },
    // setUser(state, action) {
    //   storage.save(storage.AUTH_KEY, action.payload)
    // }
  },
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.user = action.payload.data
      if (action.payload.hasOwnProperty('success')) {
        if (action.payload.success === false) {
          state.isAuth = false
          state.authId = null
          state.user = null
          state.errors.push(action.payload.errors[0])
          return
        }
      }
      state.isAuth = true
      state.authId = action.payload.data.id
      state.user = action.payload.data
      storage.save(storage.AUTH_KEY, state.user)
      storage.save(storage.AUTH_KEY, state.user)
      state.errors = []

    },
    [createChannelAsync.fulfilled]: (state, action) => {
      console.log(state)
    },
  }
})

export const { clearState, getUser, setUser } = AuthSlice.actions

export default AuthSlice.reducer
