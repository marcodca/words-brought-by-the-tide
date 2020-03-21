import React from "react";
import styled from "styled-components";
import media from "../styles/mediaHelper";
import logo from "../styles/img/logo.png";

export default () => (
  <a href={"https://www.marcodecara.com/"}>
    <Container>
      Made by:
      <img src={logo} width={30} alt="Marco de cara's logo"/>
    </Container>
  </a>
);

const Container = styled.aside`
  position: absolute;
  color: initial;
  left: 5px;
  top: 63vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  opacity: 0.8;
  ${media.md` top: 67vh; flex-direction: row; font-size: 22px; img {
      margin-left: 2px;
      width: 40px;
  }`}
`;
