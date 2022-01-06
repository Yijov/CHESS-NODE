import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../state/reducers";
import { socket, events } from "../../../../socket";
import { GameActions } from "../../../../state/action_creators";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import useDrawEmitSocket from "../draw_emit_socket/useDrawEmitSocket";

export const useClockBarComands = () => {
  const params = useParams();
  const gameState = useSelector((state: State) => state.game);
  const dispatch = useDispatch();
  const { GameOver } = bindActionCreators(GameActions, dispatch);
  const { OFFER_DRAW } = useDrawEmitSocket();

  const RESIGNATION = () => {
    if (gameState.inProgress) {
      GameOver("You have resigned this game");
      socket.emit(events.RESIGNATION, params.roomid!!);
    }
  };

  const DRAW_OFFER = () => {
    if (gameState.inProgress) {
      OFFER_DRAW();
    }
  };

  return { resignation: RESIGNATION, drawOffer: DRAW_OFFER, offeringDraw: gameState.offeringDraw };
};
