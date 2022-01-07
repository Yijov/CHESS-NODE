import IChatState from "./IChatState";
import IGameState from "./IGameState";
import IClockState from "./IClockState";
export default interface IStateDefault {
  chat: IChatState;
  game: IGameState;
  clock: IClockState;
}
