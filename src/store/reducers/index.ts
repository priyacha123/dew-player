// reducers/index.js
import { combineReducers } from "redux";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  counter: userSlice,
  // Add other reducers here
});

export default rootReducer;
