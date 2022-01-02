import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import socket from "../../../socket/Socket";
import events from "../../../socket/Events";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChatActionCreators from "../../../state/action_creators/chat_action_creators";
import { bindActionCreators } from "redux";
import IChatMessage from "../../../models/IChatMessage";
import makeid from "../../../utils/MakeId";

export const useChatSocket = () => {
  //obtaining the room id from the url params
  const params = useParams();

  //state of the chat input form
  const defaultchat: IChatMessage = { from: socket.id, message: "", room: params.roomid!!, id: "" };
  const [chat, setChat] = useState<IChatMessage>(defaultchat);

  //bringin acction creators from state
  const dispatch = useDispatch();
  const { SendChat, ReceiveChat } = bindActionCreators(ChatActionCreators, dispatch);

  //function to control the input
  const HANDLE_CHAT_INPUT = (e: ChangeEvent<HTMLInputElement>) => {
    setChat({ ...chat, message: e.target.value });
  };

  //handle the submit
  const HANDLE_SEND_CHAT = (e: FormEvent) => {
    e.preventDefault();
    socket.emit(events.CHAT_MESSAGE, chat);
    SendChat({ from: "Me", message: chat.message, room: chat.room, id: makeid(11) });
    setChat(defaultchat);
  };

  //listening to incoming chats
  useEffect(() => {
    socket.on(events.CHAT_MESSAGE, (chat: IChatMessage) => ReceiveChat(chat));
    return function cleanup() {
      socket.off(events.CHAT_MESSAGE);
    };
    // eslint-disable-next-line
  }, []);

  return { HANDLE_CHAT_INPUT, HANDLE_SEND_CHAT, CHAT_INPUT_VALUE: chat.message };
};
