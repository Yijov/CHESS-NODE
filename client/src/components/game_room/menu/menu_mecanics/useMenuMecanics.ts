import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { GameActions } from "../../../../state/action_creators";

const useMenuMecanics = () => {
  //switch board orientation from state
  const dispatch = useDispatch();
  const { RotateBoard, NewGame } = bindActionCreators(GameActions, dispatch);

  return { RotateBoard, NewGame };
};

export default useMenuMecanics;
