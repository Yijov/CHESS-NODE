import IGameState from "../abstraction/IGameState";
const GameInitialState: IGameState = {
  position: "start",
  boardOrientation: "white",
  inProgress: false,
  gameOver: false,
  gameOverReason: undefined,
  offeringDraw: false,
  OponentIsOfferingDraw: false,
};

export default GameInitialState;
