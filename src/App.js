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
        <QuotesDisplayContainer/>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffc45e;
  background-image: url("https://www.transparenttextures.com/patterns/grey-sandbag.png");
  box-shadow: inset 0px 30px 30px 5px rgb(255 255 255 / .3);
  z-index: 1;
  position: relative;   
`;

export default App;
