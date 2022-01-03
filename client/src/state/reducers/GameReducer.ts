import gameActions from "../actions/gameActions";
import gameActionType from "../action_types/gameActionTypes";
import AppInitialState from "../initial_states";

const GameReducer = (state = AppInitialState.game, action: gameActions) => {
  switch (action.type) {
    case gameActionType.MOVE:
      state = { ...state, position: action.payload };
      return state;
    case gameActionType.UPDATE_BOARD:
      state = { ...state, position: action.payload };
      return state;
    case gameActionType.ROTATE_BOARD:
      if (state.boardOrientation === "white") {
        state = { ...state, boardOrientation: "black" };
      } else {
        state = { ...state, boardOrientation: "white" };
      }
      return state;
    default:
      return state;
  }
};

export default GameReducer;
