import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { socket } from "../../../../socket";
import { events } from "../../../../socket";
import { ClockActions, GameActions } from "../../../../state/action_creators";
import { State } from "../../../../state/reducers";

const useClockSocket = () => {
  const { clock, game } = useSelector((state: State) => state);
  const params = useParams();

  const dispatch = useDispatch();
  const { updateTime } = bindActionCreators(ClockActions, dispatch);
  const { GameOver } = bindActionCreators(GameActions, dispatch);

  const whiteTiemetoDisplay = `${clock.whiteTime.minutes}:${clock.whiteTime.seconds < 10 ? 0 : ""}${
    clock.whiteTime.seconds
  }`;
  const blackTiemetoDisplay = `${clock.blacktime.minutes}:${clock.blacktime.seconds < 10 ? 0 : ""}${
    clock.blacktime.seconds
  }`;

  useEffect(() => {
    let interv = setInterval(() => {
      socket.emit(events.UPDATE_TIME, params.roomid!!, updateTime);
    }, 1000);

    //terminate game if one player runs out of time
    if (clock.whiteTime.minutes === 0 && clock.whiteTime.seconds === 0) {
      clearInterval(interv);
      GameOver("White has lost on time");
    } else if (clock.blacktime.minutes === 0 && clock.blacktime.seconds === 0) {
      clearInterval(interv);
      GameOver("Black has lost on time");
    }

    //destroy interval on unmount
    return () => {
      clearInterval(interv);
    };
    // eslint-disable-next-line
  }, [game.inProgress, clock.whiteTime.seconds, clock.blacktime.seconds]);

  return { whiteTiemetoDisplay, blackTiemetoDisplay };
};

export default useClockSocket;
