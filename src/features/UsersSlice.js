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
    idSearch: null,
  },
  reducers: {
    clearStateChannels(state, action) {
      state.status = false
      state.list = []
      state.idSearch = null
      return state
    },
    searchUser(state, { payload }) {
      state.idSearch = payload
    },
    clearIdSearch(state, action) {
      state.idSearch = null
      state.emailSearch = null
      return state
    },
  },
  extraReducers: {
    [UsersListAsync.fulfilled]: (state, action) => {
      state.list = action.payload.data
    },
  }
})

export const { clearStateChannels, searchUser, clearIdSearch } = UsersList.actions

export default UsersList.reducer
