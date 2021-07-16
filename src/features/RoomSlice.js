import { createSlice } from '@reduxjs/toolkit'

const roomSlice = createSlice({
  name: 'channelId',
  initialState: {
    roomId: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.channelId
    },
    clearStateChannelId: (state, action) => {
      state.roomId = null
    }
  },
})

export const { enterRoom, clearStateChannelId } = roomSlice.actions
export default roomSlice.reducer
