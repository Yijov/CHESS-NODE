import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";

const oponentDrawOfferOff = () => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.OPONENT_DRAW_OFFER_OFF });
  };
};

export default oponentDrawOfferOff;
