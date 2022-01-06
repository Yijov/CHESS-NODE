import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../../../state/reducers";
import { IMoveImput, MoveSendDTO } from "../../../../models";
import { GameActions } from "../../../../state/action_creators";
import { socket, events } from "../../../../socket";
import { MoveOnClick, MoveProcesor, OponentListening } from "./sub_hooks/";
import { ChessInstance } from "chess.js";
const ChessClass = require("chess.js");

export default function useGameMovement(URLroomid: string) {
  //chess logic object
  const [Chess] = useState<ChessInstance>(new ChessClass());

  //importing the game state from the store
  const gameState = useSelector((state: State) => state.game);
  const dispatch = useDispatch();
  const { Move, GameOver } = bindActionCreators(GameActions, dispatch);
  const MOVE_PROCESOR = new MoveProcesor(Move, GameOver, Chess);

  //player own move
  const MOVE_EMITING = (moveImput: IMoveImput): boolean => {
    //Dont move if no game is being played
    if (!gameState.inProgress || gameState.gameOver) {
      return false;
    }
    let newMove = MOVE_PROCESOR.TRANSLATE_INPUT(moveImput);
    //boradcast only if the move is posible
    if (MOVE_PROCESOR.EXECUTE_MOVE(newMove)) {
      let lastposition = MOVE_PROCESOR.CURRENT_POSITION();
      //wait for move animation to complete and then end game if game over
      socket.emit(events.MOVE, new MoveSendDTO(moveImput, URLroomid, lastposition));
      setTimeout(() => {
        MOVE_PROCESOR.HANDLE_TERMINATE_GAME_IF_GAME_OVER();
      }, 800);
      return true;
    } else {
      return false;
    }
  };

  //for received moves
  const MOVE_WITHOUT_EMITING = (moveImput: IMoveImput): void => {
    let translatedMove = MOVE_PROCESOR.TRANSLATE_INPUT(moveImput);
    MOVE_PROCESOR.EXECUTE_MOVE(translatedMove);

    //wait for move animation to complete and then end game if game over
    setTimeout(() => {
      MOVE_PROCESOR.HANDLE_TERMINATE_GAME_IF_GAME_OVER();
    }, 1000);
  };

  const { ON_SQUARE_CLICK } = MoveOnClick(MOVE_EMITING);

  /* listening to events 
  from the oponent side
  */
  OponentListening(MOVE_WITHOUT_EMITING, socket, URLroomid, Chess);
  //hook return values

  return {
    moveOnDrop: MOVE_EMITING,
    position: gameState.position,
    chessjsinstance: Chess,
    onSqareClick: ON_SQUARE_CLICK,
  };
}
