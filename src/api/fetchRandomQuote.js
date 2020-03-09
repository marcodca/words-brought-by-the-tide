import {
  fetchQuoteRequested,
  fetchQuoteFailed,
  fetchQuoteSucceeded
} from "../reducers/quotesSlice";

export default async dispatch => {
  dispatch(fetchQuoteRequested());
  try {
    const response = await fetch(
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_X_RAPIDPI_KEY
        }
      }
    );
    const data = await response.json();
    if (!data.content && data.message) throw new Error(data.message);

    const {
      content,
      originator: { name }
    } = data;
    dispatch(fetchQuoteSucceeded({ content, author: name }));
  } catch (error) {
    console.error(error);
    dispatch(fetchQuoteFailed({ error : error.message }));
  }
};
