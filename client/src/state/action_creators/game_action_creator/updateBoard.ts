import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const UPdateBoardCreator = (fen: string) => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.UPDATE_BOARD, payload: fen });
  };
};

export default UPdateBoardCreator;
