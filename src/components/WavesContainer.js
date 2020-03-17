import React from "react";
import Wave from "./Wave";
import waves from "../data/waves";
import { MoveToTheSides, MoveUpAndDown } from "../styles/animations";

const { waveOne } = waves;

const WavesContainer = () => (
  <>
    {/* <MoveToTheSides> */}
      <Wave
        initialPath={waveOne.initialPath}
        animatePath={waveOne.animatePath}
        color={"rgb(220 214 247 / .8)"}
      />
    {/* </MoveToTheSides> */}
    {/* <MoveUpAndDown> */}
      <Wave
        initialPath={waveOne.initialPath}
        animatePath={waveOne.animatePath}
        color={"rgb(166 177 225 / .8)" }
        delay={2}
      />
    {/* </MoveUpAndDown> */}
    {/* <MoveToTheSides delay={2}> */}
      <Wave
        initialPath={waveOne.initialPath}
        animatePath={waveOne.animatePath}
        color={"rgb(66 72 116 /.8)"}
        delay={4}
      />
    {/* </MoveToTheSides> */}
  </>
);


export default WavesContainer;
