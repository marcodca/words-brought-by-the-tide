import React from "react";
import WaveSmall from "./WaveSmall";

const waveColors = ["rgb(220 214 247 / .8)", "rgb(166 177 225 / .8)", "rgb(66 72 116 /.8)" ]; 

export default () => (
  <>
    {waveColors.map((color, i) => (
      <WaveSmall key={i} color={color} delay={i * 2} />
    ))}
  </>
);

