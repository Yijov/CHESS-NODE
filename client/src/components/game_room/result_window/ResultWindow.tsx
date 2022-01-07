import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { GameActions, ClockActions } from "../../../state/action_creators";
import { State } from "../../../state/reducers";
import { socket, events } from "../../../socket";
import { ChessInstance } from "chess.js";
import { useParams } from "react-router-dom";
import { INewGameDTO } from "../../../models";

const ResultWindow: React.FC<{ BoardObject: ChessInstance }> = ({ BoardObject }) => {
  const URLParams = useParams();
  const { game, clock } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const { NewGame, Reset } = bindActionCreators(GameActions, dispatch);
  const { ResetTimer } = bindActionCreators(ClockActions, dispatch);

  const startnewGame = () => {
    ResetTimer();
    let data: INewGameDTO = {
      roomID: URLParams.roomid!!,
      clockParams: { initialTime: clock.initialTime, increment: clock.increment },
    };

    socket.emit(events.NEW_GAME, data);
    BoardObject.reset();
    NewGame();
  };
  const resetBoard = () => {
    BoardObject.reset();
    Reset();
  };

  return game.gameOver ? (
    <div id="game-result-window">
      <h2 id="game-over_title">Game Over!</h2>
      <h3 id="game-over-reason__message">{game.gameOverReason}</h3>
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
