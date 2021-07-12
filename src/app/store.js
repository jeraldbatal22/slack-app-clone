import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import RegisterSlice from "../features/RegisterSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    register: RegisterSlice,
  }
})

export default store