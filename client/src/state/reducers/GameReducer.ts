import gameActions from "../actions/gameActions";
import gameActionType from "../action_types/gameActionTypes";
import AppInitialState from "../initial_states";

const GameReducer = (state = AppInitialState.game, action: gameActions) => {
  switch (action.type) {
    //move a piece
    case gameActionType.MOVE:
      state = { ...state, position: action.payload };
      return state;

    //update board position
    case gameActionType.UPDATE_GAME:
      let { inProgress, gameOverReason, gameOver } = action.payload;

      state = { ...state, inProgress, gameOverReason, gameOver };
      return state;

    //start new game
    case gameActionType.NEW_GAME:
      state = {
        ...AppInitialState.game,
        inProgress: true,
        boardOrientation: state.boardOrientation,
      };
      return state;

    //end game
    case gameActionType.GAME_OVER:
      state = {
        ...state,
        gameOver: true,
        inProgress: false,
        gameOverReason: action.payload,
        OponentIsOfferingDraw: false,
        offeringDraw: false,
      };
      return state;

    //draw Handlers
    case gameActionType.OPONENT_DRAW_OFFER_ON:
      state = { ...state, OponentIsOfferingDraw: true };
      return state;

    case gameActionType.OPONENT_DRAW_OFFER_OFF:
      state = { ...state, OponentIsOfferingDraw: false };
      return state;

    case gameActionType.OWN_DRAW_OFFER_ON:
      state = { ...state, offeringDraw: true };
      return state;

    case gameActionType.OWN_DRAW_OFFER_OFF:
      state = { ...state, offeringDraw: false };
      return state;

    //reset board
    case gameActionType.RESET:
      return AppInitialState.game;

    //rotate the board
    case gameActionType.ROTATE_BOARD:
      if (state.boardOrientation === "white") {
        state = { ...state, boardOrientation: "black" };
      } else {
        state = { ...state, boardOrientation: "white" };
      }
      return state;

    //do nothing on default
    default:
      return state;
  }
};

export default GameReducer;
