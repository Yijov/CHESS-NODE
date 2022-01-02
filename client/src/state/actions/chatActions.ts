import IChatMessage from "../../models/IChatMessage";
import chatActionTypes from "../action_types/chatActionTypes";
interface SendChatAction {
  type: chatActionTypes.SEND_MESSAGE;
  payload: IChatMessage;
}

interface ReceiveChatAction {
  type: chatActionTypes.RECEIVE_MESSAGE;
  payload: IChatMessage;
}

type chatAction = SendChatAction | ReceiveChatAction;

export default chatAction;
