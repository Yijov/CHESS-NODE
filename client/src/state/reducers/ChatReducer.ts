import chatAction from "../actions/chatActions";
import chatActionTypes from "../action_types/chatActionTypes";
import AppInitialState from "../initial_states";
import IChatState from "../initial_states/abstraction/IChatState";

const ChatReducer = (state: IChatState = AppInitialState.chat, action: chatAction) => {
  switch (action.type) {
    case chatActionTypes.SEND_MESSAGE:
      state = { ...state };
      state.feed.push(action.payload);
      return state;

    case chatActionTypes.RECEIVE_MESSAGE:
      state = { ...state };
      state.feed.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default ChatReducer;
