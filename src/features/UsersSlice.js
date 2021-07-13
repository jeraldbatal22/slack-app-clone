import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'

export const UsersListAsync = createAsyncThunk(
  'users/UsersListAsync',
  async () => {
    const data = await axios.get('users/', true)
    return data
  }
)

const UsersList = createSlice({
  name: 'users',
  initialState: {
    status: false,
    list: [],
  },
  reducers: {
    clearStateChannels(state, action) {
      state.status = false
      state.list = []
      return state
    }
  },
  extraReducers: {
    [UsersListAsync.fulfilled]: (state, action) => {
      state.list = action.payload.data
      // state.list = []
      // if (action.payload.hasOwnProperty('errors')) {
      //   state.status = true
      // } else {
      //   state.channels = action.payload.data
      // }
    },
  }
})

export const { clearStateChannels } = UsersList.actions

export default UsersList.reducer
