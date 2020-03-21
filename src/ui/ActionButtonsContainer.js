import React from "react";
import fetchRandomQuote from "../api/fetchRandomQuote";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import ActionButton from "./ActionButton";

export default ({
  increaseQuotesIndex,
  decreaseQuotesIndex,
  quotesIndex,
  loading,
  quotes
}) => {
  const dispatch = useDispatch();

  const isPreviousDisabled = quotesIndex < 1;
  const isNextDisabled = loading === "loading";

  return (
    <Container>
      <ActionButton
        onClick={() => {decreaseQuotesIndex()}}
        disabled={isPreviousDisabled}
        label={"Previous Quote"}
      />
      <ActionButton
        onClick={() => {
          if (!!quotes[quotesIndex + 1]) {
            increaseQuotesIndex();
            return;
          }
          dispatch(fetchRandomQuote);
        }}
        label={"Next Quote"}
        disabled={isNextDisabled}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;
