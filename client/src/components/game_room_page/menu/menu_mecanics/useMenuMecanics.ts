import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import GameActionCreators from "../../../../state/action_creators/game_action_creator";

const useMenuMecanics = () => {
  //switch board orientation from state
  const dispatch = useDispatch();
  const { RotateBoard } = bindActionCreators(GameActionCreators, dispatch);

  return { RotateBoard };
};

export default useMenuMecanics;
