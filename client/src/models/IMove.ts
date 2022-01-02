import { Square } from "chess.js";
export default interface Move {
  from: Square;
  to: Square;
  promotion: "b" | "q" | "n" | "r" | undefined;
}
