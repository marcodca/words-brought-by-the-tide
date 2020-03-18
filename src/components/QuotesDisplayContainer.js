import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import fetchRandomQuote from "../api/fetchRandomQuote";
import QuotesDisplay from "./QuotesDisplay";
import WaveBig from "./WaveBig";

export default () => {
  const dispatch = useDispatch();
  const [quotesIndex, setQuotesIndex] = useState(-1);
  const quotesData = useSelector(selectQuotes);
  const { loading, error, quotes } = quotesData;
  const controls = useAnimation();
  const quotesControls = useAnimation();

  console.log(quotesData);

  const startWave = () => {
    controls.start(i => {
      return {
        opacity: [
          1,
          1,
          1,
          i.opacity,
          i.opacity,
          i.opacity,
          1
        ],
        height: ["30vh", "130vh", "30vh"],
        transition: {
          duration: 2,
          ease: "linear",
          ease: i.ease,
          delay: i.delay
        }
      };
    });
  };

  const showQuote = () => {
    quotesControls.start({
      opacity: [0, 0, 1, 0.8, 0.7, 0.6, 0.5],
      transition: { duration: 7, ease: "linear" }
    });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (!quotes[quotesIndex + 1]) {
        dispatch(fetchRandomQuote);
      } else {
        setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
      }
    }, 7000);
    return () => {
      clearTimeout(id);
    };
  });

  useLayoutEffect(() => {
    startWave();
    showQuote();
    return () => {
      setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
    };
  }, [quotes]);

  useLayoutEffect(() => {
    startWave();
    showQuote();
  }, [quotesIndex]);

  return (
    <div data-testid="quotes-display-container">
      <WaveBig controls={controls} />
      <QuotesDisplay
        quote={quotes[quotesIndex]}
        loading={loading}
        quotesControls={quotesControls}
      />
      <button
        style={{
          position: "relative",
          zIndex: 3
        }}
        onClick={() => {
          setQuotesIndex(prev => (prev <= 0 ? 0 : prev - 1));
        }}
        disabled={quotesIndex < 1}
      >
        Prev
      </button>
      <button
        style={{
          position: "relative",
          zIndex: 3
        }}
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
