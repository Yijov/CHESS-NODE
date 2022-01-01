import { Socket } from "socket.io";
import GameService from "../services/GameService";
import events from "../enums/Events";
import { IMove, IChatMessage } from "../models";

class GameController {
  constructor() {}
  public connectionHandler(socket: Socket) {
    console.log(socket.id + "has connected");

    // join the game
    socket.on(events.JOIN_GAME, (roomId: string) => GameService.JOIN_GAME(socket, roomId));

    //update geme position on reconect
    socket.on(events.UPDATE_GAME, (roomId: string, updateBoard: Function) =>
      GameService.UPDATE_GAME(socket, roomId, updateBoard)
    );

    //chat message handling
    socket.on(events.CHAT_MESSAGE, (message: IChatMessage) => {
      GameService.HANDLE_CHAT_MESSAGE(socket, message);
    });

    //move pieces
    socket.on(events.MOVE, (move: IMove) => {
      GameService.MOVE(socket, move);
    });

    //start new game
    socket.on(events.NEW_GAME, () => GameService.START_NEW_GAME);

    //handle disconection event
    socket.on(events.DISCONECT, () => {
      console.log(`user ${socket.id} disconected`);
    });
  }
}
export default GameController;
