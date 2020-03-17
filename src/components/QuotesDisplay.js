import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const QuotesDisplay = ({ quote, loading, quotesControls }) => {
  // console.log(quote);
  return (
    <AnimatePresence>
      {loading === "idle" && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <Container
            // initial={{ opacity: 0 }}
            animate={quotesControls}
            // transition={{ duration: 7, loop: Infinity, delay: 1 }}
          >
            <Quote data-testid="quote-display">
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
  font-size: 4em;
  text-align: center;
`;

const Author = styled.span`
  font-size: 0.8em;
  display: block;
  text-align: right;
`;

export default QuotesDisplay;
