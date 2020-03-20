import React from "react";
import MainContainer from "./components/MainContainer";
import styled from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import WavesContainer from "./components/WavesSmallContainer";
import sandTexture from './styles/img/sand-texture.png';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContainer/>
        <WavesContainer />
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffc45e;
  background-image: url(${sandTexture});
  box-shadow: inset 0px 30px 30px 5px rgb(255 255 255 / .3);
  z-index: 1;
  position: relative; 
`;

export default App;
