import { ClockAction } from "../actions";
import clockActionTypes from "../action_types/clockActionTipes";
import AppInitialState from "../initial_states";

const ClockReducer = (state = AppInitialState.clock, action: ClockAction) => {
  switch (action.type) {
    case clockActionTypes.SET_START_TIME:
      const { increment, initialTime } = action.payload;
      state = {
        initialTime: initialTime,
        increment: increment,
        whiteTime: { minutes: initialTime, seconds: 0 },
        blacktime: { minutes: initialTime, seconds: 0 },
        blackTurn: false,
      };
      return state;
    case clockActionTypes.UPDATE_TIME:
      return action.payload;
    case clockActionTypes.RESET_TIMER:
      return (state = {
        ...state,
        whiteTime: { minutes: state.initialTime, seconds: 0 },
        blacktime: { minutes: state.initialTime, seconds: 0 },
        blackTurn: false,
      });
    default:
      return state;
  }
};

export default ClockReducer;
