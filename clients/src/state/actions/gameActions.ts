import gameActionType from "../action_types/gameActionTypes";

interface MoveAction {
  type: gameActionType.MOVE;
  payload: string;
}
interface UpdateAction {
  type: gameActionType.UPDATE_BOARD;
  payload: string;
}

type GameAction = MoveAction | UpdateAction;

export default GameAction;
