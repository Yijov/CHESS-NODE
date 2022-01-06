import IChatState from "./IChatState";
import IGameState from "./IGameState";
export default interface IStateDefault {
  chat: IChatState;
  game: IGameState;
}
