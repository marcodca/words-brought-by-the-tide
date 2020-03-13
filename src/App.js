import React, { useEffect } from "react";
import { selectQuotes } from "./reducers/quotesSlice";
import { selectCounter } from './reducers/totalCountSlice';
import fetchQuote from "./api/fetchRandomQuote";
import { useDispatch, useSelector } from "react-redux";
import getTotalQuotesCount from './api/getTotalQuotesCount';
import QuotesDisplayContainer from './components/QuotesDisplayContainer';


function App() {

  const count =  useSelector(selectCounter);

  return (
    <div>
      <QuotesDisplayContainer/>
    <p>Total count: {count}</p>
    </div>
  );
}

export default App;
