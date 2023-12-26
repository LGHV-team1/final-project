import { createSlice } from "@reduxjs/toolkit";

export const rankSlice = createSlice({
  name: "rank",
  initialState: {
    value: 0,
  },
  reducers: {
    setRankValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setRankValue} = rankSlice.actions;

export default rankSlice.reducer;