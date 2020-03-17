import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const MoveToTheSides = ({ children, delay }) => (
  <Wrapper
    initial={{ x: "0%" }}
    animate={{ x: "-10%" }}
    transition={{ duration: 6, ease: "linear", yoyo: Infinity, delay }}
  >
    {children}
  </Wrapper>
);

export const MoveUpAndDown = ({ children, delay }) => (
  <Wrapper>
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-8%" }}
      transition={{ duration: 6, ease: "linear", yoyo: Infinity, delay }}
    >
      {children}
    </motion.div>
  </Wrapper>
);

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  /* overflow: hidden; */
  bottom: -100px;
  /* left: 0; */
  right: %;
`;
