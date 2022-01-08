import React, { useEffect, useRef } from "react";
import { State } from "../../../state/reducers";
import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { ImBlocked } from "react-icons/im";
import useChatSocket from "./useChatSocket";
import useDrawSocket from "./useDrawReceptionSocket";
import IChatMessage from "../../../models/IChatMessage";

const Chat: React.FC = () => {
  const AppState = useSelector((state: State) => state);
  const { HANDLE_CHAT_INPUT, HANDLE_SEND_CHAT, CHAT_INPUT_VALUE } = useChatSocket();
  const { REJECT_DRAW, ACCEPT_DRAW } = useDrawSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (window.innerHeight > 812) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [HANDLE_SEND_CHAT]);

  return (
    <div id="chat_container">
      <div id="chat-message-box">
        {/*messages rendering from state  */}
        {AppState.chat.feed.map((chat: IChatMessage) =>
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

        {/*draw offer div component only visible if a draw is being offered by oponnt */}
        {AppState.game.OponentIsOfferingDraw && (
          <div id="draw-offer__message">
            <p>Draw?</p>
            <button id="accept__button" title="Accept" onClick={ACCEPT_DRAW}>
              <GiConfirmed />
            </button>
            <button id="reject__button" title="Reject" onClick={REJECT_DRAW}>
              <ImBlocked />
            </button>
          </div>
        )}

        {/*Rference div in order to auto scroll dowm */}
        <div ref={messagesEndRef} />
      </div>

      {/*chat input form */}
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
