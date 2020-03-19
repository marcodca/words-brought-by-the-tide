import { createGlobalStyle } from "styled-components";
import media from './mediaHelper';

export default createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-size: 8px;
    ${media.md`font-size: 12px`}
    ${media.lg`font-size: 16px`}
    transition: font-size .5s;
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
