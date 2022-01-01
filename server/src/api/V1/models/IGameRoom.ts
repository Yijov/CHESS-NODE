import { IMoveImput } from ".";

export default interface IGameRoom {
  roomId: string;
  currentPosition: string;
  moves: IMoveImput[];
}
