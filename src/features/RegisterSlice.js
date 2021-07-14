import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'

export const fetchRegisterAsync = createAsyncThunk(
  'register/fetchRegisterAsync',
  async (payload) => {
    console.log(payload)
    const data = await axios.post('auth/', payload) // Store to the auth, api
    return data
  }
)

const RegisterSlice = createSlice({
  name: 'register',
  initialState: {
    status: null,
    data: null,
    errors: []
  },
  reducers: {
    clearState: (state, { payload }) => {
      state.status = null
      state.data = null
      state.errors = []
    }
  },
  extraReducers: {
    [fetchRegisterAsync.fulfilled]: (state, action) => {
      if (action.payload.status === 'error') {
        state.status = action.payload.status
        state.errors.push(action.payload.errors.full_messages[0])
      } else {
        state.errors = 0
        state.status = null
        state.data = action.payload.data
      }
    },

  },
})

export const { clearState } = RegisterSlice.actions
export default RegisterSlice.reducer
