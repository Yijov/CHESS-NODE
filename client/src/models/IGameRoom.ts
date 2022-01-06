import { IMoveImput } from ".";

export default interface IGameRoom {
  roomId: string;
  currentPosition: string;
  moves: IMoveImput[];
  inProgress: boolean;
  gameOver: boolean;
  gameOverReason: String | undefined;
}
