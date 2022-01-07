import { clockActionTypes } from "../../action_types";
import clockAction from "../../actions/clockActions";
import IClockState from "../../initial_states/abstraction/IClockState";
import { Dispatch } from "react";

const updatetTimeCreator = (updatedClock: IClockState) => {
  return (dispatch: Dispatch<clockAction>) => {
    dispatch({ type: clockActionTypes.UPDATE_TIME, payload: updatedClock });
  };
};

export default updatetTimeCreator;
