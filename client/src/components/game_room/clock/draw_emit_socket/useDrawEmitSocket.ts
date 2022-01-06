import { useEffect } from "react";
import socket from "../../../../socket/Socket";
import events from "../../../../socket/Events";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GameActions } from "../../../../state/action_creators";
import { bindActionCreators } from "redux";

const useDrawEmitSocket = () => {
  //obtaining the room id from the url params
  const params = useParams();

  //bringin acction creators from state
  const dispatch = useDispatch();
  const { GameOver, OwnDrawOfferOff, OwnDrawOfferOn } = bindActionCreators(GameActions, dispatch);

  const OFFER_DRAW = () => {
    socket.emit(events.DRAW_OFFER, params.roomid!!);
    OwnDrawOfferOn();
  };

  const HANDLE_DRAW_ACCEPT_BY_OPONENT = () => {
    GameOver("Draw agreed");
  };

  //listening to incoming chats
  useEffect(() => {
    socket.on(events.DRAW_REJECT, () => OwnDrawOfferOff());
    socket.on(events.DRAW_ACCEPT, () => HANDLE_DRAW_ACCEPT_BY_OPONENT());

    return function cleanup() {
      socket.off(events.DRAW_REJECT);
      socket.off(events.DRAW_ACCEPT);
    };
    // eslint-disable-next-line
  }, []);

  return { OFFER_DRAW };
};
export default useDrawEmitSocket;
