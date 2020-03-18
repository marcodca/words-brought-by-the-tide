import React from "react";
import Wave from "./Wave";

const waveColors = ["rgb(220 214 247 / .8)", "rgb(166 177 225 / .8)", "rgb(66 72 116 /.8)" ]; 



const WavesContainer = () => (
  <>
    {waveColors.map((color, i) => (
      <Wave key={i} color={color} delay={i * 2} />
    ))}
  </>
);

export default WavesContainer;
