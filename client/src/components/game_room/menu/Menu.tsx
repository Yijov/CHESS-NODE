import React from "react";
import useMenuMecanics from "./menu_mecanics/useMenuMecanics";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { MdTimer } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillBulb } from "react-icons/ai";
import { ChessInstance } from "chess.js";
import { socket } from "../../../socket";
import { events } from "../../../socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";

const Menu: React.FC<{ BoardObject: ChessInstance }> = ({ BoardObject }) => {
  const URLParams = useParams();
  const { RotateBoard, NewGame } = useMenuMecanics();
  const gameState = useSelector((state: State) => state.game);

  const switchBoardHandler = () => {
    RotateBoard();
  };

  const StartGame = () => {
    socket.emit(events.NEW_GAME, URLParams.roomid);
    BoardObject.reset();
    NewGame();
  };

  return (
    <div id="game-room_menu">
      {gameState.inProgress ? (
        <AiFillBulb className="icon" id="game-on" title="Start" />
      ) : (
        <BsFillPlayFill className="icon" title="Start" onClick={StartGame} />
      )}
      <MdTimer title="Clock Setting" className="icon" />
      <HiOutlineSwitchVertical
        title="Change orientation"
        className="icon"
        onClick={switchBoardHandler}
      />
    </div>
  );
};

export default Menu;
