import React from "react";
import GlobalStyle from "./styles/globalStyle";
import sandTexture from "./styles/img/sand-texture.png";
import styled from "styled-components"
import MainContainer from "./ui/MainContainer";
import WavesSmallContainer from "./ui/WavesSmallContainer"
import TotalCountDisplay from "./ui/TotalCountDisplay"
import StatusDisplay from "./ui/StatusDisplay"
import Signature from "./ui/Signature"

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContainer />
        <WavesSmallContainer />
        <TotalCountDisplay />
        <StatusDisplay />
        <Signature />
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
  box-shadow: inset 0px 30px 30px 5px rgb(255 255 255 / 0.3);
  z-index: 1;
  position: relative;
`;

export default App;
