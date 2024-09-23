import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/slice";

const store = configureStore({
  reducer: authSlice,
});
export default store;
