import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const UPdateBoardCreator = () => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.ROTATE_BOARD });
  };
};

export default UPdateBoardCreator;
