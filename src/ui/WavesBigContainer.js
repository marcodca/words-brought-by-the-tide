import React from "react";
import PropTypes from "prop-types";
import WaveBig from "./WaveBig";

const WavesBigContainer = ({ controls, wetSandDuration }) => {

  //The custom wave array correspond to [wetSand, whiteWave, blueWave]

  const customBigWaves = [
    {
      color: "rgb(0 0 0 / .5  )",
      custom: {
        ease: "easeIn",
        opacity: [1, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
        isWetSand: true,
        wetSandDuration
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

  return (
    <>
      {customBigWaves.map((wave, i) => (
        <WaveBig
          key={i}
          custom={wave.custom}
          color={wave.color}
          controls={controls}
          wetSandDuration={wetSandDuration}
        />
      ))}
      {shortWaves.map((wave, i) => (
        <WaveBig
          key={i}
          color={wave.color}
          animate={{ height: "55vh" }}
          initial={{ height: "0vh" }}
          transition={{
            duration: 1.5,
            yoyo: Infinity,
            delay: i * 0.8,
            ease: wave.ease
          }}
        />
      ))}
    </>
  );
};

const shortWaves = [
  { color: "rgb(244 238 255 /.7 )", ease: "easeInOut" },
  { color: "rgb(220 214 247 /.7)", ease: "easeOut" }
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
        duration: i.isWetSand ? i.wetSandDuration : 3,
        ease: i.ease,
        delay: i.delay
      }
    };
  });
};

WavesBigContainer.propTypes = {
  controls: PropTypes.object.isRequired,
  wetSandDuration: PropTypes.number.isRequired
};
export default WavesBigContainer;
