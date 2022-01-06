import { GameActionTypes } from "../../action_types";
import { GameAction } from "../../actions";
import { Dispatch } from "react";

const ownDrawOfferOff = () => {
  return (dispatch: Dispatch<GameAction>) => {
    dispatch({ type: GameActionTypes.OWN_DRAW_OFFER_OFF });
  };
};

export default ownDrawOfferOff;
