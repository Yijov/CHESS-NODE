import React from "react";
import Image from "../../../assets/images/banner.svg";

export const Header: React.FC = () => {
  return (
    <div id="page-header">
      <h1>
        <img src={Image} alt="Logo" id="header-image" />;
      </h1>
    </div>
  );
};
