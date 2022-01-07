import React from "react";
import { useClockBarComands } from "./clock_mecanics/useClockBarComands";
import useClockSocket from "./clock_mecanics/useClockSocket";
import Spiner from "../../_shared_/spiner/Spiner";
import { FaFlag, FaHandsHelping } from "react-icons/fa";

const Clock: React.FC = () => {
  const { resignation, drawOffer, offeringDraw } = useClockBarComands();
  const { whiteTiemetoDisplay, blackTiemetoDisplay } = useClockSocket();

  return (
    <div id="clock">
      <span id="resignation_buttom" title="Resign" onClick={resignation}>
        <FaFlag />
      </span>
      <span id="white-time">{whiteTiemetoDisplay} </span>
      <span id="black-time">{blackTiemetoDisplay}</span>
      <span id="draw-offer_buttom" title="Offer draw" onClick={drawOffer}>
        {offeringDraw ? <Spiner /> : <FaHandsHelping />}
      </span>
    </div>
  );
};

export default Clock;
