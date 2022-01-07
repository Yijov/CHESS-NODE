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
import { INewGameDTO } from "../../../models";

const Menu: React.FC<{ BoardObject: ChessInstance }> = ({ BoardObject }) => {
  const URLParams = useParams();
  const { RotateBoard, NewGame, changeTimeFormat } = useMenuMecanics();
  const { game, clock } = useSelector((state: State) => state);

  const switchBoardHandler = () => {
    RotateBoard();
  };

  const StartGame = () => {
    let data: INewGameDTO = {
      roomID: URLParams.roomid!!,
      clockParams: { initialTime: clock.initialTime, increment: clock.increment },
    };
    socket.emit(events.NEW_GAME, data);
    BoardObject.reset();
    NewGame();
  };

  return (
    <div id="game-room_menu">
      {game.inProgress ? (
        <AiFillBulb className="icon" id="game-on" title="Start" />
      ) : (
        <BsFillPlayFill className="icon" title="Start" onClick={StartGame} />
      )}
      <MdTimer title="Clock Setting" className="icon" onClick={changeTimeFormat} />
      <HiOutlineSwitchVertical
        title="Change orientation"
        className="icon"
        onClick={switchBoardHandler}
      />
    </div>
  );
};

export default Menu;
