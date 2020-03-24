import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence, transform } from "framer-motion";

const QuotesDisplay = ({ quote, loading, quotesControls }) => {
  //Used to set the font-size of the quote depending on its length
  const quoteFontSize = quote
    ? transform(quote.content.length, [0, 1000], [3.5, 1.5])
    : 4;

  return (
    <AnimatePresence>
      {loading === "idle" && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <Container animate={quotesControls}>
            <Title shouldNotDisplay={!!quote}>Words brought by the tide</Title>
            {quote && (
              <Quote data-testid="quote-display" fontSize={quoteFontSize}>
                {quote.content}
                <Author>{quote.author}</Author>
              </Quote>
            )}
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

const Title = styled.h1`
  width: 80%;
  font-size: 4rem;
  text-align: center;
  display: ${props => props.shouldNotDisplay && `none`};
`;

const Quote = styled.h2`
  width: 80%;
  font-size: ${props => `${props.fontSize}rem`};
  text-align: center;
`;

const Author = styled.span`
  font-size: 0.8em;
  margin-top: 0.5em;
  display: block;
  text-align: right;
`;

QuotesDisplay.propTypes = {
  quote: PropTypes.exact({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }),
  loading: PropTypes.string,
  quotesControls: PropTypes.object.isRequired
};

export default QuotesDisplay;
