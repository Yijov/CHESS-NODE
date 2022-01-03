import { useSelector } from "react-redux";
import { State } from "../../../../state/reducers";

const useBoardMecanics = () => {
  //importing general state
  const BoardOrientation = useSelector((state: State) => state.game.boardOrientation);

  //calculate board with for responsivenes
  const ResponsiveBoard = () => {
    let x = window.innerWidth;
    let maxWidt = 400;

    if (x <= maxWidt) return x;
    return maxWidt;
  };

  return { ResponsiveBoard, BoardOrientation };
};

export default useBoardMecanics;
