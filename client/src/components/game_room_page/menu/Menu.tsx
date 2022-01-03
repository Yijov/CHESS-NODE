import React from "react";
import useMenuMecanics from "./menu_mecanics/useMenuMecanics";
import { RiVolumeOffVibrateFill } from "react-icons/ri";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { MdTimer } from "react-icons/md";
const Menu: React.FC = () => {
  const { RotateBoard } = useMenuMecanics();

  const switchBouarHandler = () => {
    RotateBoard();
  };

  return (
    <div id="game-room_menu">
      <RiVolumeOffVibrateFill className="icon" title="Leave" />
      <MdTimer title="Clock Setting" className="icon" />
      <HiOutlineSwitchVertical
        title="Change orientation"
        className="icon"
        onClick={switchBouarHandler}
      />
    </div>
  );
};

export default Menu;
