import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default ({ color = "none", initialPath, animatePath, delay }) => (
  <Wrapper
    width="100vw"
    height="40vh"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"

  >
    <motion.path
      initial={{ d: initialPath }}
      animate={{ d: animatePath }}
      transition={{ duration: 5, yoyo: Infinity, ease: "linear", delay }}
      fill={color}
      strokeLinejoin="round"
    />
  </Wrapper>
);


const Wrapper = styled.svg`
  position: absolute;
  bottom: -10%;
  left: 0;
  z-index: 2;

`