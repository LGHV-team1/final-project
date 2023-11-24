import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../searchSlice.js";
import rankReducer from "../rankSlice.js";


export const store = configureStore({
  reducer: {
    search: searchReducer,
    rank: rankReducer,
  },
});
