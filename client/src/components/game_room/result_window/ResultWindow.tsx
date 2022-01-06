import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import GameActionCreators from "../../../state/action_creators/game_action_creator";
import { State } from "../../../state/reducers";
import { socket, events } from "../../../socket";
import { ChessInstance } from "chess.js";
import { useParams } from "react-router-dom";

const ResultWindow: React.FC<{ BoardObject: ChessInstance }> = ({ BoardObject }) => {
  const URLParams = useParams();
  const gameState = useSelector((state: State) => state.game);
  const dispatch = useDispatch();
  const { NewGame, Reset } = bindActionCreators(GameActionCreators, dispatch);

  const startnewGame = () => {
    socket.emit(events.NEW_GAME, URLParams.roomid!!);
    BoardObject.reset();
    NewGame();
  };
  const resetBoard = () => {
    BoardObject.reset();
    Reset();
  };

  return gameState.gameOver ? (
    <div id="game-result-window">
      <h2 id="game-over_title">Game Over!</h2>
      <h3 id="game-over-reason__message">{gameState.gameOverReason}</h3>
      <button id="rematch__button" onClick={startnewGame}>
        Rematch
      </button>
      <button id="reset__button" onClick={resetBoard}>
        Reset
      </button>
    </div>
  ) : (
    <></>
  );
};

export default ResultWindow;
