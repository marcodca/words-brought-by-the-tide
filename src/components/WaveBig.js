import React from "react";
import { motion, useAnimation } from "framer-motion";
import { waveInitialPath, waveAnimatePath } from "./Wave";
import styled from "styled-components";

const BaseWave = ({ color, controls, custom }) => (
  <Wrapper
    width="102vw"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    animate={controls}
    custom={custom}
    initial={{ opacity: 1 }}
  >
    <motion.path
      initial={{
        d: waveInitialPath
      }}
      animate={{
        d: waveAnimatePath
      }}
      transition={{
        duration: 1,
        yoyo: custom.isWetSand ? 0 : Infinity,
        ease: "linear"
      }}
      fill={color}
      strokeLinejoin="round"
    />
  </Wrapper>
);

export default ({ controls }) => {
  return (
    <>
      {customWaves.map((wave, i) => (
        <BaseWave
          key={i}
          custom={wave.custom}
          color={wave.color}
          controls={controls}
        />
      ))}
    </>
  );
};

//The custom wave array correspond to [wetSand, whiteWave, blueWave]

const customWaves = [
  {
    color: "rgb(0 0 0 / .5  )",
    custom: {
      ease: "easeIn",
      opacity: [1, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
      isWetSand: true
    }
  },
  {
    color: "rgb(244, 238, 255 )",
    custom: { ease: "easeInOut", opacity: 1 }
  },
  {
    color: "rgb(220, 214, 247)",
    custom: {
      delay: 0.3,
      ease: "easeOut",
      opacity: [1, 1, 1, 0, 0, 0, 1]
    }
  }
];

//Note: This function is keep in here for organization sake, but is meant to be called from the parent component.

export const waveAnimationStarter = customControls => {
  customControls.start(i => {
    return {
      opacity: i.opacity,
      height: i.isWetSand
        ? ["30vh", "100vh", "100vh", "100vh", "100vh", "100vh", "100vh"]
        : ["30vh", "130vh", "30vh"],
      transition: {
        duration: i.isWetSand ? 7 : 2,
        ease: i.ease,
        delay: i.delay
      }
    };
  });
};

const Wrapper = styled(motion.svg)`
  position: absolute;
  bottom: -10%;
  left: -1%;
  z-index: 1;
`;
