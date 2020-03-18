import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default ({ color = "none", delay }) => (
  <Wrapper
    width="102vw"
    height="40vh"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <motion.path
      initial={{
        d:
          "M187.755 30.9582C155.967 -46.8505 31.4636 54.2245 1 30.9582V301H1201V34.963C1183.78 13.6038 1133.45 79.5886 1022.19 34.963C910.934 -9.66256 830.139 56.3223 797.689 34.963C769.874 6.54762 660.603 65.2855 593.053 30.9582C525.503 -3.3692 497.689 -6.22979 368.55 30.9582C239.411 68.1461 219.543 108.767 187.755 30.9582Z"
      }}
      animate={{
        d:
          "M203.318 31.5235C120.669 80.422 34.0022 51.8979 1 31.5235V268H1301V35.0306C1282.35 16.3262 1217.49 -9.85986 1107.29 35.0306C997.093 79.921 899.234 53.7349 864.079 35.0306C833.947 10.1471 747.424 -25.3912 642.391 31.5235C537.358 88.4382 436.486 55.238 399.179 31.5235C368.329 11.1491 285.967 -17.375 203.318 31.5235Z"
      }}
      transition={{ duration: 5, yoyo: Infinity, ease: "linear", delay }}
      fill={color}
      strokeLinejoin="round"
    />
  </Wrapper>
);

const Wrapper = styled.svg`
  position: absolute;
  bottom: -10%;
  left: -1%;
  z-index: 2;
`;
