import React from "react";

const QuotesDisplay = ({ quote, loading }) => {
  // console.log(quote);
  return <p data-testid="quote-display">{quote ? quote.content : "Words brought by the tide"}</p>;
};

export default QuotesDisplay;
