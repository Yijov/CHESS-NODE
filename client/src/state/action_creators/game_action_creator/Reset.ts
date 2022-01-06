import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const ResetCreator = () => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.RESET });
  };
};

export default ResetCreator;
