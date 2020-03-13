import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "totalCount",
  initialState: {
    count : null
  },
  reducers: {
    totalCountFetchSucceeded: (state, action) => {
      state.count = action.payload
    },
  }
});

export const selectCounter = state => state.totalCount.count;
export const { totalCountFetchSucceeded } = slice.actions;

export default slice.reducer;
