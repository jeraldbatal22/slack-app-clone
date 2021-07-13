import { createSlice } from '@reduxjs/toolkit'
// import moment from 'moment'

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
// export const selectRoomId = state => state.app.roomId
export default roomSlice.reducer
