import { useState } from "react";
import { IMoveImput } from "../../../../../models";
import { Square } from "chess.js";

interface movment {
  sourceSquare: undefined | Square;
  targetSquare: undefined | Square;
  piece: string;
}

const defaultState = {
  sourceSquare: undefined,
  targetSquare: undefined,
  piece: "",
};

const useMoveOnClick = (MovementFunction: (moveImput: IMoveImput) => boolean) => {
  const [ShortMove, setShortMove] = useState<movment>(defaultState);
  //const TOUCHEDPIECE = () => {};
  const ON_SQUARE_CLICK = async (square: string) => {
    let clicked = square as Square;
    if (!ShortMove.sourceSquare) {
      setShortMove({ ...ShortMove, sourceSquare: clicked });
    } else if (!ShortMove.targetSquare) {
      setShortMove({ ...ShortMove, sourceSquare: clicked });
      MovementFunction({
        sourceSquare: ShortMove.sourceSquare!!,
        targetSquare: clicked,
        piece: "",
      });
      setShortMove(defaultState);
    } else {
      console.log(ShortMove);
    }
  };

  return { ON_SQUARE_CLICK };
};
export default useMoveOnClick;
