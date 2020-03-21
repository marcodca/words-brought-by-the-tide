import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { waveInitialPath, waveAnimatePath } from "./WaveSmall";
import { motion } from "framer-motion";

const WaveBig = ({ color, controls, custom, initial, animate, transition }) => (
  <Wrapper
    width="102vw"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    initial={initial || { opacity: 1 }}
    animate={controls || animate}
    custom={custom}
    transition={transition}
  >
    <motion.path
      initial={{
        d: waveInitialPath
      }}
      animate={{
        d: waveAnimatePath
      }}
      transition={{
        duration: custom ? 1 : 4,
        yoyo: custom?.isWetSand ? 0 : Infinity,
        ease: "linear"
      }}
      fill={color}
      strokeLinejoin="round"
    />
  </Wrapper>
);

const Wrapper = styled(motion.svg)`
  position: absolute;
  bottom: -10%;
  left: -1%;
  z-index: ${props => (props.custom?.isWetSand ? 0 : 1)};
`;

WaveBig.propTypes = {
  color: PropTypes.string.isRequired,
  controls: PropTypes.object,
  custom: PropTypes.object,
  initial: PropTypes.object,
  animate: PropTypes.object,
  transition: PropTypes.object
};

export default WaveBig;
