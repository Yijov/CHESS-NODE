import { combineReducers } from "redux";
import GameReducer from "./GameReducer";
import ChatReducer from "./ChatReducer";
import ClockReducer from "./ClockReducer";

const reducers = combineReducers({
  game: GameReducer,
  chat: ChatReducer,
  clock: ClockReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
