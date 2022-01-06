import React from "react";
import Spiner from "../../_shared_/spiner/Spiner";
import { useClockBarComands } from "./clock_mecanics/useClockBarComands";
import { FaFlag, FaHandsHelping } from "react-icons/fa";

const Clock: React.FC = () => {
  const { resignation, drawOffer, offeringDraw } = useClockBarComands();

  return (
    <div id="clock">
      <span id="resignation_buttom" title="Resign" onClick={resignation}>
        <FaFlag />
      </span>
      <span id="white-time">4:39 </span>
      <span id="black-time">2:21</span>
      <span id="draw-offer_buttom" title="Offer draw" onClick={drawOffer}>
        {offeringDraw ? <Spiner /> : <FaHandsHelping />}
      </span>
    </div>
  );
};

export default Clock;
