import React from "react";
import Image from "../../../assets/images/banner.svg";

export const Footer: React.FC = () => {
  return (
    <div id="page-footer">
      <h1>
        <img src={Image} alt="Logo" id="footer-image" />;
      </h1>
    </div>
  );
};
