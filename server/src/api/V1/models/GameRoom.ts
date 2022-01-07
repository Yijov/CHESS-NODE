import IGameRoom from "./IGameRoom";
import IMoveInput from "./IMoveInput";
import { ChessClock } from ".";

export default class GameRoom implements IGameRoom {
  private _currentPosition: string;
  private _moves: IMoveInput[];
  private _inProgress: boolean;
  private _gameOver: boolean;
  private _gameOverReason: String | undefined;
  private _clock: ChessClock;
  constructor(
    private _roomId: string,
    clockSetting: { initialTime: 10 | 3 | 1 | 5 | 15; increment: 0 | 10 | 1 | 5 }
  ) {
    this._moves = [];
    this._currentPosition = "start";
    this._inProgress = true;
    this._gameOver = false;
    this._clock = new ChessClock(clockSetting.initialTime, clockSetting.increment);
  }

  get roomId() {
    return this._roomId;
  }

  set roomId(value) {
    this._roomId = value;
  }
  get currentPosition() {
    return this._currentPosition;
  }

  set currentPosition(value) {
    this._currentPosition = value;
  }
  get moves() {
    return this._moves;
  }
  set moves(value) {
    this._moves = value;
  }
  get inProgress() {
    return this._inProgress;
  }
  set inProgress(value) {
    this._inProgress = value;
  }
  get gameOver() {
    return this._gameOver;
  }
  set gameOver(value) {
    this._gameOver = value;
  }
  get gameOverReason() {
    return this._gameOverReason;
  }
  set gameOverReason(value) {
    this._gameOverReason = value;
  }
  get clock() {
    return this._clock;
  }
}
