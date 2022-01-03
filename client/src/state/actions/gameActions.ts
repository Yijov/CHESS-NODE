import gameActionType from "../action_types/gameActionTypes";

interface MoveAction {
  type: gameActionType.MOVE;
  payload: string;
}
interface UpdateAction {
  type: gameActionType.UPDATE_BOARD;
  payload: string;
}

interface RotateBoardAction {
  type: gameActionType.ROTATE_BOARD;
}

type GameAction = MoveAction | UpdateAction | RotateBoardAction;

export default GameAction;
