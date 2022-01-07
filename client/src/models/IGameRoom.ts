import { IMoveImput } from ".";
import IClock from "./IClock";

export default interface IGameRoom {
  roomId: string;
  currentPosition: string;
  moves: IMoveImput[];
  inProgress: boolean;
  gameOver: boolean;
  gameOverReason: String | undefined;
  clock: IClock;
}
