import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
const NewGameCreator = () => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.NEW_GAME });
  };
};

export default NewGameCreator;
