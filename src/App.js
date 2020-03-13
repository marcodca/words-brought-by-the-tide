import React, { useEffect } from "react";
import { selectQuotes } from "./reducers/quotesSlice";
import { selectCounter } from './reducers/totalCountSlice';
import fetchQuote from "./api/fetchRandomQuote";
import { useDispatch, useSelector } from "react-redux";
import getTotalQuotesCount from './api/getTotalQuotesCount';


function App() {
  const dispatch = useDispatch();
  const quotesData = useSelector(selectQuotes);
  const totalCount = useSelector(selectCounter);

  useEffect(()=>{
    dispatch(getTotalQuotesCount);
  },[]);

  return (
    <div>
    </div>
  );
}

export default App;
