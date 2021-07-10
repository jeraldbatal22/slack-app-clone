import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice
  }
})

export default store