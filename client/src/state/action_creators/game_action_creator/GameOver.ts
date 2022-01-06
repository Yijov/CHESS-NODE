import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const GameOverCreator = (gameOverReason: string) => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.GAME_OVER, payload: gameOverReason });
  };
};

export default GameOverCreator;
