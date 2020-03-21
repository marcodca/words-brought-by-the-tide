import React from "react";
import { useSelector } from "react-redux";
import { selectCounter } from "../reducers/totalCountSlice";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import media from "../styles/mediaHelper";

export default () => {
  const totalCount = useSelector(selectCounter);
  return (
    <AnimatePresence>
      {totalCount && (
        <Container
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "100%" }}
        >
          <div>
            <span>
              <span className="global">Quotes historic </span> total:
            </span>
            <span className="count"> {totalCount}</span>
          </div>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.aside)`
  position: absolute;
  z-index: 5;
  bottom: 15vh;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: var(--color-blue-light);
  font-weight: 500;
  text-transform: capitalize;
  ${media.md`
  bottom: 2vh;
  font-size: 2rem;
  text-transform: none;
  letter-spacing: 2px;
  div {
      width: 33%;
      text-align: center;
  }
  `}
  .count {
    font-size: 0.8em;
  }
  .global {
    display: none;
    ${media.md`display: inline-block;`}
  }
`;
