import React from "react";
import { useParams } from "react-router-dom";
import Chessboard from "chessboardjsx";
import useResponsiveBoard from "./board_style/useResponsiveBoard";
import useGameMovement from "./game_movement/useGameMovement";
import Clock from "../clock/Clock";
import Menu from "../menu/Menu";

const Board: React.FC = () => {
  //obtaining the room id from the url params
  const params = useParams();

  /*moveOnDrop, onPiececlick and onSqareClick captures the user imput and updates the position 
  object accordingly to the result of that move, if the move is ilegal, the board wont update*/
  const { moveOnDrop, position, onSqareClick, onPiececlick } = useGameMovement(params.roomid!!);

  return (
    <>
      <div>
        <Chessboard
          id={"chess-board"}
          position={position}
          onDrop={moveOnDrop}
          orientation="white"
          calcWidth={useResponsiveBoard}
          onSquareClick={onSqareClick}
          onPieceClick={onPiececlick}
        />{" "}
        <Menu />
        <Clock />
      </div>
    </>
  );
};

export default Board;
