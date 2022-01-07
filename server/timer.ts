class ChessClock {
  private _initialtime: number;
  private _increment: number;
  private _whiteTime: number;
  private _blackTime: number;
  constructor(time: number, increment: number) {
    this._initialtime = time;
    this._blackTime = time;
    this._whiteTime = time;
    this._increment = increment;
  }

  public whiteTurn() {
    setInterval(() => console.log("white time decreasing"), 1000);
  }

  public blackTurn() {
    setInterval(() => console.log("black time decreasing"), 1000);
  }

  get initialtime() {
    return this._initialtime;
  }

  set initialtime(value: number) {
    this._initialtime = value;
  }
  get increment() {
    return this._increment;
  }

  set increment(value: number) {
    this._increment = value;
  }

  get whiteTime() {
    return this._whiteTime;
  }

  set whiteTime(value: number) {
    this._whiteTime = value;
  }

  get blackTime() {
    return this._blackTime;
  }

  set blackTime(value: number) {
    this._blackTime = value;
  }
}

const clock = new ChessClock(200, 2000);

const test = setInterval(() => console.log("white time decreasing"), 1000);
