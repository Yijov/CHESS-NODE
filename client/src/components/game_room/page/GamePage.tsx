import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../socket/Socket";
import events from "../../../socket/Events";
import Chat from "../chat/ChatWindow";
import Board from "../board/Board";

const GamePage: React.FC = () => {
  //join the corresponding game room as soon as entered
  const params = useParams();
  useEffect(() => {
    socket.emit(events.JOIN_GAME, params.roomid);
    // eslint-disable-next-line
  }, []);

  return (
    <div id="game-page">
      <Board />
      <Chat />
    </div>
  );
};

export default GamePage;
