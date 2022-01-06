export default interface IGameState {
  position: string;
  boardOrientation: "white" | "black" | undefined;
  inProgress: boolean;
  gameOver: boolean;
  gameOverReason: String | undefined;
  offeringDraw: boolean;
  OponentIsOfferingDraw: boolean;
}
