import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";
import IGameRoom from "../../../models/IGameRoom";
const UPdateGameCreator = (room: IGameRoom) => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.UPDATE_GAME, payload: room });
  };
};

export default UPdateGameCreator;
