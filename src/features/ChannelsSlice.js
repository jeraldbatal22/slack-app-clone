import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'
export const channelsListAsync = createAsyncThunk(
  'channels/channelsListAsync',
  async () => {
    const data = await axios.get('channels/', true)
    return data
  }
)

export const channelsListOwnedAsync = createAsyncThunk(
  'channels/channelsListOwnedAsync',
  async () => {
    const data = await axios.get('channel/owned', true)
    console.log(data)
    return data
  }
)


export const addChannelAsync = createAsyncThunk(
  'channels/addChannelAsync',
  async (payload) => {
    const data = await axios.post('channels/', payload, true)
    return data
  }
)

export const addMemberToChannelAsync = createAsyncThunk(
  'channels/addMemberToChannelAsync',
  async (payload) => {
    const data = await axios.post('channel/add_member/', payload, true)
    return data
  }
)

export const viewMembersToChannelAsync = createAsyncThunk(
  'channels/viewMembersToChannelAsync',
  async (payload) => {
    const data = await axios.get(`/channels/${payload}`, true)
    return data
  }
)

const ChannelsSlice = createSlice({
  name: 'channels',
  initialState: {
    status: false,
    list: [],
    owned: [],
    errors: [],
    memberList: [],
  },
  reducers: {
    clearStateChannels(state, action) {
      state.status = false
      state.list = []
      state.owned = []
      state.memberList = []
      state.errors = []
      return state
    },
  },
  extraReducers: {
    [channelsListAsync.fulfilled]: (state, action) => {
      state.list = []
      if (action.payload.hasOwnProperty('errors')) {
        state.status = true
      } else {
        state.list = action.payload.data
      }
    },
    [channelsListOwnedAsync.fulfilled]: (state, action) => {
      state.owned = []
      if (action.payload.hasOwnProperty('errors')) {
        state.status = true
      } else {
        state.owned = action.payload.data
      }
    },
    [addChannelAsync.fulfilled]: (state, action) => {
      state.errors = action.payload.errors
      const newData = action.payload.data
      state.owned.push(newData)
    },
    [addMemberToChannelAsync.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('errors')) {
        state.errors = action.payload.errors
      } else {
        state.memberList = action.payload.data.channel_members
      }
    },
    [viewMembersToChannelAsync.fulfilled]: (state, action) => {
      state.memberList = action.payload.data.channel_members
    },
  }
})

export const { clearStateChannels } = ChannelsSlice.actions

export default ChannelsSlice.reducer
