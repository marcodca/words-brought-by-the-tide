import React from "react";
import fetchRandomQuote from "../api/fetchRandomQuote";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import media from "../styles/mediaHelper";
import arrow from "../styles/img/arrow.svg";

export default ({ setQuotesIndex, quotesIndex, loading, quotes }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setQuotesIndex(prev => (prev <= 0 ? 0 : prev - 1));
        }}
        disabled={quotesIndex < 1}
      >
        Previous Quote
        <img src={arrow} />
      </Button>
      <Button
        isRight
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!!quotes[quotesIndex + 1]) {
            setQuotesIndex(prev => (prev >= 4 ? 4 : prev + 1));
            return;
          }
          dispatch(fetchRandomQuote);
        }}
        disabled={loading === "loading"}
      >
        {" "}
        Next Quote
        <img src={arrow} />
      </Button>
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

const Button = styled(motion.button)`
  font-family: "Sacramento";
  font-weight: 500;
  appearance: none;
  background: none;
  color: var(--color-blue-light);
  border: 0;
  position: "relative";
  z-index: 3;
  border-radius: 5px;
  font-size: 25px;
  ${media.md`font-size: 35px`}
  margin: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: 1px solid var(--color-blue-light);
  }
  &:disabled {
    opacity: 0.4;
  }
  img {
    transform: ${props => props.isRight && `rotate(180deg)`};
    width: 80%;
  }
`;
