import { useEffect } from "react";
import { socket, events } from "../../../socket";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GameActions } from "../../../state/action_creators";
import { bindActionCreators } from "redux";

const useDrawReceptionSocket = () => {
  //bringin acction creators from state
  const dispatch = useDispatch();
  const { GameOver, OponentDrawOfferOn, OponentDrawOfferOff } = bindActionCreators(
    GameActions,
    dispatch
  );

  //obtaining the room id from the url params
  const params = useParams();

  const REJECT_DRAW = () => {
    socket.emit(events.DRAW_REJECT, params.roomid!!);
    OponentDrawOfferOff();
  };

  const ACCEPT_DRAW = () => {
    socket.emit(events.DRAW_ACCEPT, params.roomid!!);
    GameOver("Draw agreed");
  };

  //listening to incoming chats
  useEffect(() => {
    socket.on(events.DRAW_OFFER, () => OponentDrawOfferOn());

    return function cleanup() {
      socket.off(events.DRAW_OFFER);
    };
    // eslint-disable-next-line
  }, []);

  return { REJECT_DRAW, ACCEPT_DRAW };
};
export default useDrawReceptionSocket;
