import { clockActionTypes } from "../../action_types";
import clockAction from "../../actions/clockActions";
import { Dispatch } from "react";

const ResetTimerCreator = () => {
  return (dispatch: Dispatch<clockAction>) => {
    dispatch({ type: clockActionTypes.RESET_TIMER });
  };
};

export default ResetTimerCreator;
