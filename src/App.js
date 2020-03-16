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
`;

export default App;
