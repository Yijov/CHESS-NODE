import { IMoveImput, IMove } from "../../../../../models";
import { ChessInstance } from "chess.js";

class MoveProcesor {
  constructor(
    private MoveFunction: (fen: string) => {},
    private GameOverFunction: (reason: string) => {},
    private BoardPosition: ChessInstance
  ) {}

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
  public CURRENT_POSITION = () => {
    return this.BoardPosition.fen();
  };

  /*wil update the state to gameover if the game has ended via 
checkmate, stalemate, draw, threefold repetition, or 
insufficient material.
there is no need to emit since it will do the same for received moves.*/
  public HANDLE_TERMINATE_GAME_IF_GAME_OVER = () => {
    if (this.BoardPosition.game_over()) {
      this.GameOverFunction(this.GAME_OVER_REASON());
    }
  };

  // get the reason for geme over
  private GAME_OVER_REASON = (): string => {
    if (this.BoardPosition.in_checkmate()) {
      return "Check Mate";
    } else if (this.BoardPosition.in_threefold_repetition()) {
      return "Draw by Threefolf repetition";
    } else if (this.BoardPosition.insufficient_material()) {
      return "Draw by insuficient material";
    } else if (this.BoardPosition.in_stalemate()) {
      return "Draw by stalemate";
    } else {
      return "Draw agreed";
    }
  };
}

export default MoveProcesor;

//current game position
