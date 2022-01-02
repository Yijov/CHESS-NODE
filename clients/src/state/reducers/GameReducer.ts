import gameActions from "../actions/gameActions";
import gameActionType from "../action_types/gameActionTypes";
import AppInitialState from "../initial_states";

const GameReducer = (state: string = AppInitialState.game, action: gameActions) => {
  switch (action.type) {
    case gameActionType.MOVE:
      return action.payload;
    case gameActionType.UPDATE_BOARD:
      return action.payload;
    default:
      return state;
  }
};

export default GameReducer;
