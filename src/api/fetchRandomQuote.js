import axios from 'axios';
import {
  fetchQuoteRequested,
  fetchQuoteFailed,
  fetchQuoteSucceeded
} from "../reducers/quotesSlice";
import addOneToTotalQuotesCount from './addOneToTotalQuotesCount';

export default async dispatch => {
  dispatch(fetchQuoteRequested());
  try {
    const response = await axios({
      url :"https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", 
        method: "GET",
        headers: {
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_X_RAPIDPI_KEY
        }
      }
    );
    
    const { data } = response;
    if (!data.content && data.message) throw new Error(data.message);

    const {
      content,
      originator: { name }
    } = data;
    dispatch(fetchQuoteSucceeded({ content, author: name }));
    dispatch(addOneToTotalQuotesCount);

  } catch (error) {
    console.error(error);
    dispatch(fetchQuoteFailed({ error : error.message }));
  }
};
