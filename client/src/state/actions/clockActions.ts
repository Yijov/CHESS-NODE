import IClockState from "../initial_states/abstraction/IClockState";
import clockInitialState from "../initial_states/defaults/clockInitialState";
import clockActionTypes from "../action_types/clockActionTipes";

interface SetTimeAction {
  type: clockActionTypes.SET_START_TIME;
  payload: {
    initialTime: typeof clockInitialState.initialTime;
    increment: typeof clockInitialState.increment;
  };
}

interface UpdateTimeAction {
  type: clockActionTypes.UPDATE_TIME;
  payload: IClockState;
}

interface ResetTimeAction {
  type: clockActionTypes.RESET_TIMER;
}

type clockAction = SetTimeAction | UpdateTimeAction | ResetTimeAction;

export default clockAction;
