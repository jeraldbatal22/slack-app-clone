import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import RegisterSlice from "../features/RegisterSlice";
import ChannelsSlice from "../features/ChannelsSlice";
import RoomSlice from "../features/RoomSlice";
import UsersSlice from "../features/UsersSlice";
import MessagesSlice from "../features/MessagesSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    register: RegisterSlice,
    channels: ChannelsSlice,
    roomId: RoomSlice,
    users: UsersSlice,
    messages: MessagesSlice,
  }
})

export default store