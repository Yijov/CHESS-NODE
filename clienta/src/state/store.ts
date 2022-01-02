import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import AppInitialState from "./initial_states";

const store = createStore(reducers, AppInitialState, compose(applyMiddleware(thunk)));

export default store;
