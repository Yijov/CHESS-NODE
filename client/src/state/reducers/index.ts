import { combineReducers } from "redux";
import GameReducer from "./GameReducer";
import ChatReducer from "./ChatReducer";

const reducers = combineReducers({
  game: GameReducer,
  chat: ChatReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
