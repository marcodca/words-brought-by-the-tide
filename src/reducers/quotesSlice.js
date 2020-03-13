import { createSlice } from '@reduxjs/toolkit';

//A reference for the max nr of quotes to be stored in the state.
const quotesLimit =  5;

export const slice = createSlice({
  name: 'quotes',
  initialState: {
    loading : "idle",
    error : null,
    quotes : []
  },
  reducers: {
    fetchQuoteRequested: state => {
      state.loading = 'loading';
    },
    fetchQuoteFailed: (state, action ) => {
      state.loading = 'idle';  
      state.error = action.payload.error
    },
    fetchQuoteSucceeded: (state, action) => {

      const {content, author} = action.payload;  
      state.loading = 'idle';
      if (state.quotes.length >= quotesLimit) state.quotes.shift();
      state.quotes.push({content, author})
      state.error = null
    },
  },
});

export const selectQuotes = state => state.quotes ;
export const { fetchQuoteRequested, fetchQuoteFailed, fetchQuoteSucceeded } = slice.actions;

export default slice.reducer;
