import { createSlice } from '@reduxjs/toolkit';

//TODO: Think the logic around fetchQuoteSucceeded for having a max limit for the stored quotes.

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
      state.quotes.push({content, author})
      state.error = null
    },
  },
});

export const selectQuotes = state => state.quotes ;
export const { fetchQuoteRequested, fetchQuoteFailed, fetchQuoteSucceeded } = slice.actions;

export default slice.reducer;
