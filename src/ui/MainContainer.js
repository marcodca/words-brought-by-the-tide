import React, { useEffect, useState, useLayoutEffect } from "react";
import { useAnimation, transform } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import fetchRandomQuote from "../api/fetchRandomQuote";
import QuotesDisplay from "./QuotesDisplay";
import WavesBigContainer, { waveAnimationStarter } from "./WavesBigContainer";
import ActionButtonsContainer from "./ActionButtonsContainer";
import { quotesLimitNr, defaultSecondsBetweenWaves } from "../config";

export default () => {
  const dispatch = useDispatch();
  const quotesData = useSelector(selectQuotes);
  const { loading, quotes } = quotesData;
  const waveControls = useAnimation();
  const quotesControls = useAnimation();

  //Waiting time for next wave, is gonna depend on the current wave content length
  const [secondsBetweenWaves, setSecondsBetweenWaves] = useState(
    defaultSecondsBetweenWaves
  );

  //Index to determine the quote to render
  const [quotesIndex, setQuotesIndex] = useState(-1);

  const increaseQuotesIndex = () => {
    setQuotesIndex(prev => (prev >= quotesLimitNr ? quotesLimitNr : prev + 1));
  };

  const decreaseQuotesIndex = () => {
    setQuotesIndex(prev => (prev <= 0 ? 0 : prev - 1));
  };

  //functions to start animations
  const startWave = () => {
    waveAnimationStarter(waveControls);
  };
  const showQuote = () => {
    quotesControls.start({
      opacity: [0, 0, 1, 0.8, 0.7, 0.6, 0.5],
      transition: { duration: secondsBetweenWaves, ease: "linear" }
    });
  };

  //This effect sets the flow! If there's no next quote available, fetch a new quote, if there's a next quote available, increase the quote index.
  useEffect(() => {
    const id = setTimeout(() => {
      if (!quotes[quotesIndex + 1]) {
        dispatch(fetchRandomQuote);
      } else {
        increaseQuotesIndex();
      }
    }, secondsBetweenWaves * 1000);
    return () => {
      clearTimeout(id);
    };
  });

  //Every time the quotes dependency changes, run the animations, and when un-mounting, increase the index.
  useLayoutEffect(() => {
    startWave();
    showQuote();
    return () => {
      increaseQuotesIndex();
    };
  }, [quotes]);

  //When the quotes index changes, run the start the animations.
  useLayoutEffect(() => {
    startWave();
    showQuote();
  }, [quotesIndex]);

  //And tis effect (the last one, I swear!) is gonna run each time the last quote in the quotes array (aka, the quote to be render) changes. The effect is gonna set the waiting time until the next wave.
  useEffect(() => {
    setSecondsBetweenWaves(
      quotes[quotesIndex]
        ? transform(quotes[quotesIndex]?.content.length, [0, 1000], [5, 25])
        : defaultSecondsBetweenWaves
    );
  }, [quotes[quotesIndex]]);

  return (
    <>
      <WavesBigContainer
        controls={waveControls}
        wetSandDuration={secondsBetweenWaves}
      />
      <QuotesDisplay
        quote={quotes[quotesIndex]}
        loading={loading}
        quotesControls={quotesControls}
      />
      <ActionButtonsContainer
        increaseQuotesIndex={increaseQuotesIndex}
        decreaseQuotesIndex={decreaseQuotesIndex}
        quotesIndex={quotesIndex}
        loading={loading}
        quotes={quotes}
      />
    </>
  );
};
