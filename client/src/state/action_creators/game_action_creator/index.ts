import { default as NewGame } from "./NewGame";
import { default as Move } from "./Move";
import { default as UpdateGame } from "./updateGame";
import { default as RotateBoard } from "./RotateBoard";
import { default as GameOver } from "./GameOver";
import { default as OponentDrawOfferOn } from "./oponentDrawOfferOn";
import { default as OponentDrawOfferOff } from "./oponentDrawOfferOff";
import { default as OwnDrawOfferOn } from "./ownDrawOfferOn";
import { default as OwnDrawOfferOff } from "./ownDrawOfferOff";
import { default as Reset } from "./Reset";

const GameActionCreators = {
  NewGame,
  Move,
  UpdateGame,
  RotateBoard,
  GameOver,
  OponentDrawOfferOn,
  OponentDrawOfferOff,
  OwnDrawOfferOff,
  OwnDrawOfferOn,
  Reset,
};

export default GameActionCreators;
