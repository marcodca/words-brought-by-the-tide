import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import fetchRandomQuote from "../api/fetchRandomQuote";
import QuotesDisplay from "./QuotesDisplay";
import WavesBigContainer, { waveAnimationStarter } from "./WavesBigContainer";
import ActionButtons from "./ActionButtons";

export default () => {
  const dispatch = useDispatch();
  const [quotesIndex, setQuotesIndex] = useState(-1);
  const quotesData = useSelector(selectQuotes);
  const { loading, error, quotes } = quotesData;
  const waveControls = useAnimation();
  const quotesControls = useAnimation();

  const startWave = () => {
    waveAnimationStarter(waveControls);
  };

  console.log(quotesData);

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
      <WavesBigContainer controls={waveControls} />
      <QuotesDisplay
        quote={quotes[quotesIndex]}
        loading={loading}
        quotesControls={quotesControls}
      />
      <ActionButtons
        setQuotesIndex={setQuotesIndex}
        quotesIndex={quotesIndex}
        loading={loading}
        quotes={quotes}
      />
    </div>
  );
};
