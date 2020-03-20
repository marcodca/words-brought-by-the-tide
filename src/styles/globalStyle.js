import { createGlobalStyle } from "styled-components";
import media from './mediaHelper';

export default createGlobalStyle`
:root {
  --color-blue: rgb(166 177 225);
  --color-blue-light: rgb(220 214 247 );
}
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
    font-family: 'Sacramento', cursive;
  }
  h1, h2 {
    font-family: 'Special Elite', cursive;
  }
`;
