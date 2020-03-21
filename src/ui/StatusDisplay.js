import React from "react";
import { useSelector } from "react-redux";
import { selectQuotes } from "../reducers/quotesSlice";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import media from "../styles/mediaHelper";

export default () => {
  let { loading, error } = useSelector(selectQuotes);
  if ( error?.includes("429")) error = "Hold down! Too many requests!";

  return (
    <Container>
      <AnimatePresence>
        {loading === "loading" && (
          <StatusContainer
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading...
            <Spinner />
          </StatusContainer>
        )}
        {error && (
          <StatusContainer
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>{error}</span>
          </StatusContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled(motion.aside)`
  position: absolute;
  top: 60vh;
  width: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3rem;
  ${media.md`
  font-size: 2rem;
  color: var(--color-blue-light);
  left: 0;
  top: 77vh;
  svg {
      path {
          stroke : rgb(220 214 247);
      }
  }
  `}
`;

const StatusContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > span {
    color: orange;
    text-shadow: 2px 2px 5px black;
    ${media.md`
       text-shadow: none;
       `}
  }
`;

const Spinner = () => (
  <svg
    width="100"
    height="15"
    viewBox="0 0 166 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      initial={{
        d:
          "M1 5.99997C1 5.99997 21.5 22 21.5 5.99997C21.5 -10 46 22.9999 46 5.99997C46 -11 70.5 21 70.5 5.99997C70.5 -9.00002 98 22 98 5.99997C98 -10 128 20.9999 127.5 5.99997C127 -9 165.5 29.9999 165.5 5.99997"
      }}
      animate={{
        d:
          "M1 5.99996C1 5.99996 13 -6.00004 21.5 5.99996C30 18 36 -8 46 5.99996C56 19.9999 56.5 -5 70.5 5.99996C84.5 16.9999 78 -10 98 5.99996C118 21.9999 111.5 -9 127.5 5.99996C143.5 20.9999 149.5 -4.5 165.5 5.99996"
      }}
      transition={{ duration: 0.5, yoyo: Infinity }}
      stroke="black"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);
