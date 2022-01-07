import IClock from "./IClock";

export default class ChessClock implements IClock {
  private _initialTime: 10 | 3 | 1 | 5 | 15;
  private _whiteTime: { minutes: number; seconds: number };
  private _blacktime: { minutes: number; seconds: number };
  private _increment: 0 | 10 | 1 | 5;
  private _blackTurn: boolean;
  constructor(initialTime: 10 | 3 | 1 | 5 | 15, increment: 0 | 10 | 1 | 5 = 0) {
    this._initialTime = initialTime;
    this._whiteTime = { minutes: initialTime, seconds: 0 };
    this._blacktime = { minutes: initialTime, seconds: 0 };
    this._blackTurn = false;
    this._increment = increment;
  }

  public decrement = () => {
    if (this._blackTurn) {
      this.decreaseTime("_blacktime");
    } else {
      this.decreaseTime("_whiteTime");
    }
  };

  public switchTurn = () => {
    this._blackTurn = !this._blackTurn;
  };

  private decreaseTime = (sideToDecrease: "_blacktime" | "_whiteTime") => {
    if (this[sideToDecrease].minutes === 0 && this[sideToDecrease].seconds === 0) {
      return;
    }
    if (this[sideToDecrease].seconds > 0) {
      this[sideToDecrease] = { ...this[sideToDecrease], seconds: this[sideToDecrease].seconds - 1 };
    } else {
      this[sideToDecrease] = {
        minutes: this[sideToDecrease].minutes - 1,
        seconds: 59,
      };
    }
  };

  get initialTime() {
    return this._initialTime;
  }
  set initialTime(value) {
    this._initialTime = value;
  }
  get whiteTime() {
    return this._whiteTime;
  }
  set whiteTime(value) {
    this._whiteTime = value;
  }
  get blacktime() {
    return this._blacktime;
  }
  set blacktime(value) {
    this._blacktime = value;
  }
  get increment() {
    return this._increment;
  }
  set increment(value) {
    this._increment = value;
  }
  get blackTurn() {
    return this._blackTurn;
  }

  set blackTurn(value) {
    this._blackTurn = value;
  }

  get clockSettings() {
    return { initialTime: this.initialTime, increment: this.increment };
  }
}
