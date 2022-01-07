import { IMoveImput } from ".";
import { ChessClock } from ".";

export default interface IGameRoom {
  roomId: string;
  currentPosition: string;
  moves: IMoveImput[];
  inProgress: boolean;
  gameOver: boolean;
  gameOverReason: String | undefined;
  clock: ChessClock;
}
