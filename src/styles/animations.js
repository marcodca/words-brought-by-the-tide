import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const MoveToTheSides = ({ children, delay }) => (
  <Wrapper
    initial={{ x: "5%" }}
    animate={{ x: "-5%" }}
    transition={{ duration: 6, ease: "linear", yoyo: Infinity, delay }}
  >
    {children}
  </Wrapper>
);

export const MoveUpAndDown = ({ children, delay }) => (
  <Wrapper>
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-10%" }}
      transition={{ duration: 6, ease: "linear", yoyo: Infinity, delay }}
    >
      {children}
    </motion.div>
  </Wrapper>
);

const Wrapper = styled(motion.div)`
  position: absolute;
  bottom: -15%;
  left: 0;
  right: 0;
`;
