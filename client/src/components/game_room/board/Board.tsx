import React from "react";
import { useParams } from "react-router-dom";
import Chessboard from "chessboardjsx";
import useGameMovement from "./game_movement/useGameMovement";
import Clock from "../clock/Clock";
import Menu from "../menu/Menu";
import useBoardMecanics from "./board_mecanics/useBoardMecanics";
import ResultWindow from "../result_window/ResultWindow";
const Board: React.FC = () => {
  //obtaining the room id from the url params
  const params = useParams();

  /*moveOnDrop, onPiececlick and onSqareClick captures the user imput and updates the position 
  object accordingly to the result of that move, if the move is ilegal, the board wont update*/
  const { moveOnDrop, position, onSqareClick, chessjsinstance } = useGameMovement(params.roomid!!);
  const { ResponsiveBoard, BoardOrientation } = useBoardMecanics();
  return (
    <>
      <div>
        <Chessboard
          id={"chess-board"}
          position={position}
          onDrop={moveOnDrop}
          orientation={BoardOrientation}
          calcWidth={ResponsiveBoard}
          onSquareClick={onSqareClick}
        />{" "}
        <Menu BoardObject={chessjsinstance} />
        <Clock />
        <ResultWindow BoardObject={chessjsinstance} />
      </div>
    </>
  );
};

export default Board;
