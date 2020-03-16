import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import fetchRandomQuote from "../api/fetchRandomQuote";
import QuotesDisplay from "./QuotesDisplay";

export default () => {
  const dispatch = useDispatch();
  const [quotesIndex, setQuotesIndex] = useState(-1);
  const quotesData = useSelector(selectQuotes);
  const { loading, error, quotes } = quotesData;

  console.log(quotesData);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!quotes[quotesIndex + 1]) {
        dispatch(fetchRandomQuote);
      } else {
        setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
      }
    }, 23000);
    return () => {
      clearTimeout(id);
    };
  });

  useEffect(() => {
    return () => {
      setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
    };
  }, [quotes]);

  return (
    <div data-testid="quotes-display-container">
      <QuotesDisplay quote={quotes[quotesIndex]} loading={loading} />
      <button
        onClick={() => {
          setQuotesIndex(prev => (prev <= 0 ? 0 : prev - 1));
        }}
        disabled={quotesIndex < 1}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (!!quotes[quotesIndex + 1]) {
            setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
            return;
          }
          dispatch(fetchRandomQuote);
        }}
        disabled={loading === "loading"}
      >
        Next
      </button>
    </div>
  );
};
