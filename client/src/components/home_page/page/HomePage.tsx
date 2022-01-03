import React, { useState } from "react";
import RoomLinkPannel from "../link_pannel/RoomLinkPannel";

const HomePage: React.FC = () => {
  const [LinkPannelOpen, setLinkPannelOpen] = useState(false);

  const OpenLinkPannel = (e: React.MouseEvent) => {
    e.preventDefault();
    setLinkPannelOpen(true);
  };

  return (
    <div id="home-page">
      <h2>Welcome to Chess Node!</h2>
      <p>Click continue to start a new game room</p>
      <button onClick={OpenLinkPannel}>Continue...</button>
      {LinkPannelOpen ? <RoomLinkPannel /> : <></>}
    </div>
  );
};

export default HomePage;
