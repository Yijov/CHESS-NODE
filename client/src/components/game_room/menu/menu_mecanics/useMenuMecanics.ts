import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { GameActions, ClockActions } from "../../../../state/action_creators";
import { State } from "../../../../state/reducers";

const useMenuMecanics = () => {
  //game state
  const { clock } = useSelector((state: State) => state);
  //switch board orientation from state
  const dispatch = useDispatch();
  const { RotateBoard, NewGame } = bindActionCreators(GameActions, dispatch);
  const { setStartTime } = bindActionCreators(ClockActions, dispatch);

  const changeTimeFormat = () => {
    switch (clock.initialTime) {
      case 1:
        return setStartTime({
          initialTime: 3,
          increment: 0,
        });
      case 3:
        return setStartTime({
          initialTime: 5,
          increment: 0,
        });
      case 5:
        return setStartTime({
          initialTime: 10,
          increment: 0,
        });
      case 10:
        return setStartTime({
          initialTime: 15,
          increment: 0,
        });
      case 15:
        return setStartTime({
          initialTime: 1,
          increment: 0,
        });
      default:
        return 3;
    }
  };

  return { RotateBoard, NewGame, changeTimeFormat };
};

export default useMenuMecanics;
