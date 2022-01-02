import chatActionTypes from "../../action_types/chatActionTypes";
import chatAction from "../../actions/chatActions";
import { Dispatch } from "react";
import IChatMessage from "../../../models/IChatMessage";

const sendChatCreator = (message: IChatMessage) => {
  return (dispatch: Dispatch<chatAction>) => {
    dispatch({ type: chatActionTypes.SEND_MESSAGE, payload: message });
  };
};

export default sendChatCreator;
