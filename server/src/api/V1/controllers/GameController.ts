import { Socket } from "socket.io";
import GameRoomService from "../services/GameRoomService";
import events from "../enums/Events";
import { IMove, IChatMessage } from "../models";

class GameController {
  constructor() {}
  public connectionHandler(socket: Socket) {
    console.log(socket.id + "has connected");

    // join the game
    socket.on(events.JOIN_GAME, (roomId: string) => GameRoomService.JOIN_GAME(socket, roomId));

    //update geme position on reconect
    socket.on(events.UPDATE_GAME, (roomId: string, updateBoard: Function) =>
      GameRoomService.UPDATE_GAME(socket, roomId, updateBoard)
    );

    //chat message handling
    socket.on(events.CHAT_MESSAGE, (message: IChatMessage) => {
      GameRoomService.HANDLE_CHAT_MESSAGE(socket, message);
    });

    //move pieces
    socket.on(events.MOVE, (move: IMove) => {
      GameRoomService.MOVE(socket, move);
    });

    //start new game
    socket.on(events.NEW_GAME, (roomid: string) => GameRoomService.START_NEW_GAME(socket, roomid));

    socket.on(events.RESIGNATION, (room: string) => GameRoomService.RESIGNATION(socket, room));

    //draw offer events
    socket.on(events.DRAW_OFFER, (room: string) => GameRoomService.DRAW_OFFER(socket, room));
    socket.on(events.DRAW_REJECT, (room: string) => GameRoomService.DRAW_REJECT(socket, room));
    socket.on(events.DRAW_ACCEPT, (room: string) => GameRoomService.DRAW_ACCEPT(socket, room));

    //handle disconection event
    socket.on(events.DISCONECT, () => {
      console.log(`user ${socket.id} disconected`);
    });
  }
}
export default GameController;
