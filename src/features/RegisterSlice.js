import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'

export const fetchRegisterAsync = createAsyncThunk(
  'register/fetchRegisterAsync',
  async (payload) => {
    const data = await axios.post('auth/', payload)  // POST to get req data from api
    return data
  }
)

// default state
const RegisterSlice = createSlice({
  name: 'register',
  initialState: {
    status: null,
    data: null,
    errors: []
  },

  // Reducer to update/get state value from the components
  reducers: {
    clearState: (state, { payload }) => {
      state.status = null
      state.data = null
      state.errors = []
    }
  },

  // Extra reducer to access data from api
  extraReducers: {
    [fetchRegisterAsync.fulfilled]: (state, action) => {
      if (action.payload.status === 'error') {
        state.status = action.payload.status
        state.errors = action.payload.errors.full_messages[0]
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
