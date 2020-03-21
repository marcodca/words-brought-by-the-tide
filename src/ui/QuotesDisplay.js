import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { inRange } from "lodash";

const QuotesDisplay = ({ quote, loading, quotesControls }) => {
  return (
    <AnimatePresence>
      {loading === "idle" && (
        <motion.div
          exitBeforeEnter
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <Container animate={quotesControls}>
            <Quote
              data-testid="quote-display"
              size={contentLengthChecker(quote?.content.length) || 4}
            >
              {quote ? quote.content : "Words brought by the tide"}
              <Author>{quote && quote.author}</Author>
            </Quote>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.h2`
  width: 80%;
  font-size: ${props => `${props.size}rem`};
  text-align: center;
`;

const Author = styled.span`
  font-size: 0.8em;
  margin-top: 0.5em;
  display: block;
  text-align: right;
`;

//Helper function for the setting the font-size of the quote depending on its length.

const contentLengthChecker = length => {
  //The key of the range object corresponds to the size in rem that's ultimately gonna be returned by the function
  const ranges = {
    1.5: [500, Infinity],
    1.8: [400, 501],
    2.2: [300, 401],
    2.6: [200, 301],
    3.2: [100, 201],
    3.5: [0, 101]
  };

  return Object.entries(ranges).reduce((acc, elem) => {
    const [label, [min, max]] = elem;
    if (inRange(length, min, max)) acc = label;
    return acc;
  }, "");
};

QuotesDisplay.propTypes = {
  quote: PropTypes.exact({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }),
  loading: PropTypes.string,
  quotesControls: PropTypes.object.isRequired
};

export default QuotesDisplay;
