import React, { useEffect } from "react";
import { selectQuotes } from "./reducers/quotesSlice";
import { selectCounter } from "./reducers/totalCountSlice";
import fetchQuote from "./api/fetchRandomQuote";
import { useDispatch, useSelector } from "react-redux";
import getTotalQuotesCount from "./api/getTotalQuotesCount";
import QuotesDisplayContainer from "./components/QuotesDisplayContainer";
import { WaveStructure } from "./components/Wave";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import { MoveToTheSides } from "./styles/animations";
import WavesContainer from "./components/WavesContainer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <WavesContainer />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 55%,
    rgba(212, 217, 146, 1) 100%
  ); */
  background-color: #ffc45e;
  background-image: url("https://www.transparenttextures.com/patterns/grey-sandbag.png");
  box-shadow: inset 0px 30px 30px 5px rgb(255 255 255 / .3)   
`;

export default App;
