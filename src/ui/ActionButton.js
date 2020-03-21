import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import media from "../styles/mediaHelper";
import arrow from "../styles/img/arrow.svg";

export default ({ onClick, disabled, label }) => (
  <Button
    whileHover={!disabled && { scale: 1.05 }}
    whileTap={!disabled && { scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    label={label}
  >
    {label}
    <img src={arrow} />
  </Button>
);

const Button = styled(motion.button)`
  font-family: "Sacramento";
  font-weight: 500;
  appearance: none;
  background: none;
  color: var(--color-blue-light);
  border: 0;
  position: "relative";
  z-index: 3;
  border-radius: 5px;
  font-size: 25px;
  ${media.md`font-size: 35px`}
  margin: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: 1px solid var(--color-blue-light);
  }
  &:disabled {
    opacity: 0.4;
  }
  img {
    transform: ${props => props.label === "Next Quote" && `rotate(180deg)`};
    width: 80%;
  }
`;
