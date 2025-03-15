// store.js
import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
