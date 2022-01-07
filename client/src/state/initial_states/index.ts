import IStateDefault from "./abstraction/IStateDefault";
import chatInitialState from "./defaults/chatInitialState";
import GameInitialState from "./defaults/GameInitialState";
import clockInitialState from "./defaults/clockInitialState";

const AppInitialState: IStateDefault = {
  chat: chatInitialState,
  game: GameInitialState,
  clock: clockInitialState,
};

export default AppInitialState;
