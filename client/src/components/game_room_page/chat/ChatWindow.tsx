import React, { useEffect, useRef } from "react";
import { State } from "../../../state/reducers";
import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { useChatSocket } from "./useChatSocket";
import IChatMessage from "../../../models/IChatMessage";

const Chat: React.FC = () => {
  const chatState = useSelector((state: State) => state.chat);
  const { HANDLE_CHAT_INPUT, HANDLE_SEND_CHAT, CHAT_INPUT_VALUE } = useChatSocket();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [HANDLE_SEND_CHAT]);

  return (
    <div id="chat_container">
      <div id="chat-message-box">
        {chatState.map((chat: IChatMessage) =>
          chat.from === "Me" ? (
            <div className="sent-message" key={chat.id}>
              {" "}
              {chat.message}
            </div>
          ) : (
            <div className="received-message" key={chat.id}>
              {chat.message}
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <form id="chat_input_form" onSubmit={HANDLE_SEND_CHAT}>
        <button>
          <IoMdSend className="sendicon" />
        </button>
        <input
          type="text"
          name="chat-message"
          id="chat-message_input"
          autoComplete="off"
          onChange={HANDLE_CHAT_INPUT}
          value={CHAT_INPUT_VALUE}
          required
        />
      </form>
    </div>
  );
};

export default Chat;
