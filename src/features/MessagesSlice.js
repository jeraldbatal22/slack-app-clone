import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as axios from '../utils/axiosApi'

export const fetchRetrieveMessages = createAsyncThunk(
  'messages/fetchRetrieveMessages',
  async (payload) => {
    try {
      const data = await axios.get(`messages?receiver_class=Channel&receiver_id=${payload}`, true)  // GET messages data ask per channel id from api axiosApi.js 
      return data
    } catch (err) {
      return { errors: false }
    }
  }
)

export const fetchSendMessageToChannel = createAsyncThunk(
  'messages/fetchSendMessageToChannel',
  async (payload) => {
    const data = await axios.post(`messages`, payload, true) // POST messages data ask per channel id from api axios axiosApi.js
    return data

  }
)

export const fetchSendDirectMessage = createAsyncThunk(
  'messages/fetchSendDirectMessage',
  async (payload) => {
    const data = await axios.post(`messages`, payload, true) // POST send messages data to user id from api axios axiosApi.js
    console.log(data)
    return data
  }
)

export const fetchDirectMessageToUser = createAsyncThunk(
  'messages/fetchDirectMessageToUser',
  async (payload) => {
    try {
      const data = await axios.get(`messages?receiver_class=User&receiver_id=${payload}`, true) // GET all messages data per user id from api axios axiosApi.js
      console.log(data)
      return data
    } catch (err) {
      return { error: false }
    }
  }
)

const RetrieveMessagesSlice = createSlice({
  name: 'messages',
  initialState: {
    error: false,
    status: null,
    list: null,
    directMsgList: [],
  },
  reducers: {
    clearStateRetrieveMessages: (state, { payload }) => {
      state.error = false
      state.status = null
      state.list = null
      state.directMsgList = null
    }
  },
  extraReducers: {
    [fetchRetrieveMessages.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('errors')) {
        state.error = true
      } else {
        state.list = action.payload.data
      }
    },

    [fetchSendMessageToChannel.fulfilled]: (state, action) => {
      const newMessage = action.payload.data
      state.list.push(newMessage)
    },

    [fetchSendDirectMessage.fulfilled]: (state, action) => {
      if (action.payload.hasOwnProperty('errors')) {
        state.status = action.payload.errors[0]
      } else {
        const newMessage = action.payload.data
        state.directMsgList.push(newMessage)
      }

    },

    [fetchDirectMessageToUser.fulfilled]: (state, action) => {
      state.directMsgList = action.payload.data
    },

  },
})

export const { clearStateRetrieveMessages } = RetrieveMessagesSlice.actions
export default RetrieveMessagesSlice.reducer
