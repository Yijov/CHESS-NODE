import { useState } from "react";
import { IMoveImput } from "../../../../models";
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

export const useMoveOnClick = (MovementFunction: (moveImput: IMoveImput) => boolean) => {
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

  const ON_PIECE_CLICK = (piece: string) => {
    if (!ShortMove.piece) {
      setShortMove({ ...ShortMove, piece: piece });
    }
  };

  return { ON_SQUARE_CLICK, ON_PIECE_CLICK };
};
