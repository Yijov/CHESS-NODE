import IChatMessage from "../../../models/IChatMessage";
import IChatState from "./IChatState";
import IGameState from "./IGameState";
export default interface IStateDefault {
  chat: IChatState;
  game: IGameState;
}
