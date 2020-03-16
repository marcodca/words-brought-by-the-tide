import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default ({ color = "none", initialPath, animatePath, delay }) => (
  <svg
    width="1202"
    height="302"
    viewBox="0 0 1202 302"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "scaleX(1.4)", width: "100%", minWidth: "600px" }}
  >
    <motion.path
      initial={{ d: initialPath }}
      animate={{ d: animatePath }}
      transition={{ duration: 5, yoyo: Infinity, ease: "linear", delay }}
      fill={color}
      strokeLinejoin="round"
    />
  </svg>
);
