import IClockState from "../abstraction/IClockState";
const clockInitialState: IClockState = {
  initialTime: 3,
  whiteTime: { minutes: 3, seconds: 0 },
  blacktime: { minutes: 3, seconds: 0 },
  increment: 0,
  blackTurn: false,
};

export default clockInitialState;
