import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Socket } from "socket.io-client";
import { IMoveImput } from "../../../../../models";
import IGameRoom from "../../../../../models/IGameRoom";
import { events } from "../../../../../socket";
import { GameActions } from "../../../../../state/action_creators";
import { ChessInstance } from "chess.js";

const useOponentListening = (
  MOVE_WITHOUT_EMITING: (moveImput: IMoveImput) => void,
  socket: Socket,
  URLroomid: string,
  noardObject: ChessInstance
) => {
  const dispatch = useDispatch();
  const { GameOver, UpdateGame, NewGame } = bindActionCreators(GameActions, dispatch);
  //put game back on trackin case of reload or lost conection
  const UPDATE_GAME = async (room: IGameRoom) => {
    const moves = room.moves;
    if (moves.length > 0) {
      moves.forEach((move) => MOVE_WITHOUT_EMITING(move));
    }

    UpdateGame(room);
  };

  useEffect(() => {
    ////put game back on trackin case of reload or lost conection
    socket.emit(events.UPDATE_GAME, URLroomid, UPDATE_GAME);

    //listen to oponent moves
    socket.on(events.MOVE, (Move: IMoveImput) => {
      MOVE_WITHOUT_EMITING(Move);
    });

    //listen to oponent moves
    socket.on(events.RESIGNATION, () => {
      GameOver("Your opponent has resigned the game");
    });

    socket.on(events.NEW_GAME, () => {
      noardObject.reset();
      NewGame();
    });

    //remove event listeners to prevent polution
    return function cleanup() {
      socket.off(events.MOVE);
      socket.off(events.RESIGNATION);
    };
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default useOponentListening;
