import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }
  body {
    max-width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  h1, h2 {
    font-family: 'Special Elite', cursive;
  }
`;
