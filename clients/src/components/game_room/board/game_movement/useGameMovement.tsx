import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../../../state/reducers";
import { IMoveImput, MoveSendDTO } from "../../../../models";
import GameActionCreators from "../../../../state/action_creators/game_action_creator";
import { socket, events } from "../../../../socket";
import MoveProcesor from "./MoveProcesor";
import { useMoveOnClick } from "./useMoveOnClick";
import { ChessInstance } from "chess.js";
const ChessClass = require("chess.js");

export default function useGameMovement(URLroomid: string) {
  //chess possition object
  const [Chess] = useState<ChessInstance>(new ChessClass());
  //importing the game state from the store
  const gameState = useSelector((state: State) => state.game);
  const dispatch = useDispatch();
  const { Move } = bindActionCreators(GameActionCreators, dispatch);
  const MOVE_PROCESOR = new MoveProcesor(Move, Chess);

  //player own move
  const MOVE_EMITING = (moveImput: IMoveImput): boolean => {
    let newMove = MOVE_PROCESOR.TRANSLATE_INPUT(moveImput);
    //boradcast only if the move is posible
    if (MOVE_PROCESOR.EXECUTE_MOVE(newMove)) {
      let lastposition = MOVE_PROCESOR.LAST_POSITION();
      socket.emit(events.MOVE, new MoveSendDTO(moveImput, URLroomid, lastposition));
      return true;
    } else {
      return false;
    }
  };

  //for received moves
  const MOVE_WITHOUT_EMITING = (moveImput: IMoveImput): void => {
    let translatedMove = MOVE_PROCESOR.TRANSLATE_INPUT(moveImput);
    MOVE_PROCESOR.EXECUTE_MOVE(translatedMove);
  };

  //put game back on trackin case of reload or lost conection
  const UPDATE_GAME = (moves: IMoveImput[]) => {
    if (moves.length > 0) moves.forEach((move) => MOVE_WITHOUT_EMITING(move));
  };

  const { ON_SQUARE_CLICK, ON_PIECE_CLICK } = useMoveOnClick(MOVE_EMITING);

  useEffect(() => {
    ////put game back on trackin case of reload or lost conection
    socket.emit(events.UPDATE_GAME, URLroomid, UPDATE_GAME);

    //listen to oponent moves
    socket.on(events.MOVE, (Move: IMoveImput) => {
      MOVE_WITHOUT_EMITING(Move);
    });

    //remove event listeners to prevent polution
    return function cleanup() {
      socket.off(events.MOVE);
    };
    // eslint-disable-next-line
  }, []);

  //hook return values
  return {
    moveOnDrop: MOVE_EMITING,
    position: gameState,
    onPiececlick: ON_PIECE_CLICK,
    onSqareClick: ON_SQUARE_CLICK,
  };
}
