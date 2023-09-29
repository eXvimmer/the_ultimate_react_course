import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const reducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
