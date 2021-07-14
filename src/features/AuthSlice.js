// Using (* as) to access all function to avoid long code but you can use like this { sample, sample2}
import * as axios from '../utils/axiosApi'
import * as storage from '../utils/storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginAsync = createAsyncThunk( // using createAsyncThunk throwing data to redux to use globally
  'auth/loginAsync',
  async (payload) => {
    const data = await axios.post('auth/sign_in', payload) // POST auth data from api axiosApi.js 
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
    //Reset to default value auth when logout
    clearState(state, action) {
      state.errors = []
      state.isAuth = false
      state.authId = null
      return state
    },
    getUser(state, action) {
      state.user = storage.get(storage.AUTH_KEY) // Get user login data from local storage
      state.errors = []
      if (state.user !== null) {
        state.isAuth = true
        state.authId = state.user.id
      } else {
        state.isAuth = false
        state.authId = null
      }
    },
  },
  // access data from api with asyncthunk
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      console.log('Loading') // Pending first then fullfilled if success
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.user = action.payload.data
      if (action.payload.hasOwnProperty('success')) {
        if (action.payload.success === false) {
          state.errors.push(action.payload.errors[0])
          return
        }
      }
      state.isAuth = true
      state.authId = action.payload.data.id
      state.user = action.payload.data
      storage.save(storage.AUTH_KEY, state.user)
      state.errors = []
    },

  }
})

export const { clearState, getUser } = AuthSlice.actions

export default AuthSlice.reducer
