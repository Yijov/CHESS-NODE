import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const MoveCreator = (fen: string) => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.MOVE, payload: fen });
  };
};

export default MoveCreator;
