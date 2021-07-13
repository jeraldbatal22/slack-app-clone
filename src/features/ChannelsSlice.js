import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as axios from '../utils/axiosApi';


export const channelsListAsync = createAsyncThunk( //fetching API with axios, get channel list
  'channels/channelsListAsync',
  async () => {
    const data = await axios.get('channels/', true) //ibabato mo yung data sa redux
    return data
  }
)

export const addChannelAsync = createAsyncThunk( //fetching API with axios, post channel name
  'channels/addChannelAsync',
  async (payload) => {
    const data = await axios.post('channels/', payload, true); //ibabato mo yung data sa redux
    return data;
  }
)

export const viewMembersToChannelAsync = createAsyncThunk( //fetching API with axios, get members list
  'channels/viewMembersToChannelAsync',
  async (payload) => {
    const data = await axios.get(`/channels/${payload}`, true)
    console.log(data)
    return data
  }
)

export const addMemberToChannelAsync = createAsyncThunk( //fetching API with axios, post member name
  'channels/addMemberToChannelAsync',
  async (payload) => {
    const data = await axios.post('channel/add_member/', payload, true);
    return data;
  }
)

const ChannelsSlice = createSlice({ //initial state; default
  name: 'channels',
  initialState: {
    status: false,
    list: [],
    errors: [],
    memberList: []
  },
  reducers: {
    clearStateChannels(state, action) { //pang-clear ng channel data pag nag-logout
      state.status = false;
      state.list = [];
      state.memberList = [];
      state.errors = [];
      return state;
    }
  },
  extraReducers: { // para makuha yung data galing axios, for error validation
    [addChannelAsync.fulfilled]: (state, action) => { 
      state.errors = action.payload.errors;
    },

    [channelsListAsync.fulfilled]: (state, action) => {
        state.list = [];
        if (action.payload.hasOwnProperty('errors')) { //pag walang data na nakuha, state.status==true
          state.status = true;
        } else { //pag walang error, ili-list yung channels
          state.list = action.payload.data;
        }
    },

    [viewMembersToChannelAsync.fulfilled]: (state, action) => {
      state.memberList = action.payload.data.channel_members;
    }
  }
})

export const { clearStateChannels } = ChannelsSlice.actions;

export default ChannelsSlice.reducer;