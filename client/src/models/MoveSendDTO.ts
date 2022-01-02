import { IMoveImput } from ".";

export default class MoveSendDTO {
  private sourceSquare: string;
  private targetSquare: string;
  private room: string;
  private piece: string;
  private newfen: string;
  constructor(moveInput: IMoveImput, roomid: string, newfen: string) {
    this.sourceSquare = moveInput.sourceSquare;
    this.targetSquare = moveInput.targetSquare;
    this.piece = moveInput.piece;
    this.room = roomid;
    this.newfen = newfen;
  }
}
