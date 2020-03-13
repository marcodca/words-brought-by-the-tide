import React from "react";

const QuotesDisplay = ({ quote, loading }) => {
  console.log(quote);
  return <p>{quote ? quote.content : "Words brought by the tide"}</p>;
};

export default QuotesDisplay;
