import chatActionTypes from "../../action_types/chatActionTypes";
import chatAction from "../../actions/chatActions";
import { Dispatch } from "react";
import IChatMessage from "../../../models/IChatMessage";
const receiveChatCreator = (message: IChatMessage) => {
  return (dispatch: Dispatch<chatAction>) => {
    dispatch({ type: chatActionTypes.RECEIVE_MESSAGE, payload: message });
  };
};

export default receiveChatCreator;
