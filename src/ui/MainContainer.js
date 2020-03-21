import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import fetchRandomQuote from "../api/fetchRandomQuote";
import QuotesDisplay from "./QuotesDisplay";
import WavesBigContainer, { waveAnimationStarter } from "./WavesBigContainer";
import ActionButtonsContainer from "./ActionButtonsContainer";

export default () => {
  const dispatch = useDispatch();
  const quotesData = useSelector(selectQuotes);
  const { loading, quotes } = quotesData;
  const waveControls = useAnimation();
  const quotesControls = useAnimation();
  
  //Index to determine the quote to render
  const [quotesIndex, setQuotesIndex] = useState(-1);

  //functions to start animations
  const startWave = () => {
    waveAnimationStarter(waveControls);
  };
  const showQuote = () => {
    quotesControls.start({
      opacity: [0, 0, 1, 0.8, 0.7, 0.6, 0.5],
      transition: { duration: 7, ease: "linear" }
    });
  };

  //This effect set the flow! If there's no next quote available, fetch a new quote, if there's a next quote available, increase the quote index.
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

  //Every time the quote dependency changes, run the animations, and when un-mounting, increase the index.
  useLayoutEffect(() => {
    startWave();
    showQuote();
    return () => {
      setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
    };
  }, [quotes]);

  //When the quotes index changes, run the start the animations.
  useLayoutEffect(() => {
    startWave();
    showQuote();
  }, [quotesIndex]);

  return (
    <div data-testid="quotes-display-container">
      <WavesBigContainer controls={waveControls} />
      <QuotesDisplay
        quote={quotes[quotesIndex]}
        loading={loading}
        quotesControls={quotesControls}
      />
      <ActionButtonsContainer
        setQuotesIndex={setQuotesIndex}
        quotesIndex={quotesIndex}
        loading={loading}
        quotes={quotes}
      />
    </div>
  );
};