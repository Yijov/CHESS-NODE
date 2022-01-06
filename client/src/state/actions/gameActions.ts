import IGameRoom from "../../models/IGameRoom";
import gameActionType from "../action_types/gameActionTypes";

interface NewGameAction {
  type: gameActionType.NEW_GAME;
}

interface MoveAction {
  type: gameActionType.MOVE;
  payload: string;
}
interface UpdateAction {
  type: gameActionType.UPDATE_GAME;
  payload: IGameRoom;
}

interface GameOveerAction {
  type: gameActionType.GAME_OVER;
  payload: string;
}

interface RotateBoardAction {
  type: gameActionType.ROTATE_BOARD;
}

interface OponentDrawOfferOnAction {
  type: gameActionType.OPONENT_DRAW_OFFER_ON;
}
interface OponentDrawOfferOffAction {
  type: gameActionType.OPONENT_DRAW_OFFER_OFF;
}

interface DrawOfferingOnAction {
  type: gameActionType.OWN_DRAW_OFFER_ON;
}
interface DrawOfferingOffAction {
  type: gameActionType.OWN_DRAW_OFFER_OFF;
}
interface ResetAction {
  type: gameActionType.RESET;
}

type GameAction =
  | NewGameAction
  | MoveAction
  | UpdateAction
  | RotateBoardAction
  | GameOveerAction
  | OponentDrawOfferOnAction
  | OponentDrawOfferOffAction
  | DrawOfferingOnAction
  | DrawOfferingOffAction
  | ResetAction;

export default GameAction;
