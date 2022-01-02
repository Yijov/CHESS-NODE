import { IMoveImput, IMove } from "../../../../models";
import { ChessInstance } from "chess.js";

class MoveProcesor {
  constructor(private MoveFunction: (fen: string) => {}, private BoardPosition: ChessInstance) {}

  // convert the input from chessboarjsx format to chessjs format
  public TRANSLATE_INPUT = (moveImput: IMoveImput) => {
    let newMove: IMove = {
      from: moveImput.sourceSquare,
      to: moveImput.targetSquare,
      promotion: "q", //auto queen
    };
    return newMove;
  };

  //Move the pieces on drag and drop by modefying the state. returns false if the move is not valid
  public EXECUTE_MOVE = (movement: IMove): boolean => {
    let changedBoardAttempt = this.BoardPosition.move(movement);
    if (changedBoardAttempt === null) return false;
    this.MoveFunction(this.BoardPosition.fen());
    return true;
  };

  //current fen of the chessjs object
  public LAST_POSITION = () => {
    return this.BoardPosition.fen();
  };
}

export default MoveProcesor;

//current game position
