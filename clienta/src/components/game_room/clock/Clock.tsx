import React from "react";
import { FaFlag, FaHandsHelping } from "react-icons/fa";

const Clock: React.FC = () => {
  return (
    <div id="clock">
      <span id="resignation_buttom" title="Resign">
        <FaFlag />{" "}
      </span>
      <span id="white-time">4:39 </span>
      <span id="black-time">2:21</span>
      <span id="draw-offer_buttom" title="Offer draw">
        <FaHandsHelping />{" "}
      </span>
    </div>
  );
};

export default Clock;
