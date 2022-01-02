import IChatMessage from "../../models/IChatMessage";
import chatAction from "../actions/chatActions";
import chatActionTypes from "../action_types/chatActionTypes";
import AppInitialState from "../initial_states";

const ChatReducer = (state: Array<IChatMessage> = AppInitialState.chat, action: chatAction) => {
  switch (action.type) {
    case chatActionTypes.SEND_MESSAGE:
      state = state.slice();
      state.push(action.payload);
      return state;

    case chatActionTypes.RECEIVE_MESSAGE:
      state = state.slice();
      state.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default ChatReducer;
