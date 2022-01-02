import React from "react";
import { RiVolumeOffVibrateFill } from "react-icons/ri";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { MdTimer } from "react-icons/md";
const Menu: React.FC = () => {
  return (
    <div id="game-room_menu">
      <RiVolumeOffVibrateFill title="Leave" />
      <MdTimer title="Clock Setting" />
      <HiOutlineSwitchVertical title="Change orientation" />
    </div>
  );
};

export default Menu;
