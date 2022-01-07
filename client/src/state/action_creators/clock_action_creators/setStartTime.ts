import { clockActionTypes } from "../../action_types";
import clockAction from "../../actions/clockActions";
import clockInitialState from "../../initial_states/defaults/clockInitialState";
import { Dispatch } from "react";

const setStartTimeCreator = (settings: {
  initialTime: typeof clockInitialState.initialTime;
  increment: typeof clockInitialState.increment;
}) => {
  return (dispatch: Dispatch<clockAction>) => {
    dispatch({ type: clockActionTypes.SET_START_TIME, payload: settings });
  };
};

export default setStartTimeCreator;
