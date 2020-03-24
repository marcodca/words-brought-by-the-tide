import { createSlice } from "@reduxjs/toolkit";
import { quotesLimitNr } from "../config";

export const slice = createSlice({
  name: "quotes",
  initialState: {
    loading: "idle",
    error: null,
    quotes: []
  },
  reducers: {
    fetchQuoteRequested: state => {
      state.loading = "loading";
    },
    fetchQuoteFailed: (state, action) => {
      state.loading = "idle";
      state.error = action.payload.error;
    },
    fetchQuoteSucceeded: (state, action) => {
      const { content, author } = action.payload;
      state.loading = "idle";
      //Edge case check ahead
      if (state.quotes.length >= quotesLimitNr + 2)
      //
        state.quotes.length = quotesLimitNr + 1;
      if (state.quotes.length >= quotesLimitNr + 1) state.quotes.shift();
      state.quotes.push({ content, author });
      state.error = null;
    }
  }
});

export const selectQuotes = state => state.quotes;
export const {
  fetchQuoteRequested,
  fetchQuoteFailed,
  fetchQuoteSucceeded
} = slice.actions;

export default slice.reducer;
