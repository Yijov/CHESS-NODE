import { Square } from "chess.js";
export default interface IMoveImput {
  sourceSquare: Square;
  targetSquare: Square;
  piece: string;
}
