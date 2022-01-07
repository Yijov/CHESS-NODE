import { Socket } from "socket.io";
import GameRoomService from "../services/GameRoomService";
import events from "../enums/Events";
import { IMove, IChatMessage, INewGameDTO, IClockUpdateDTO } from "../models";
import { autoInjectable, singleton } from "tsyringe";

@autoInjectable()
@singleton()
class GameController {
  constructor(private service: GameRoomService) {}

  public connectionHandler = (socket: Socket) => {
    console.log(socket.id + "has connected");

    // join the game room
    socket.on(events.JOIN_GAME, (roomId: string) => this.service.JOIN_GAME(socket, roomId));

    //start new game
    socket.on(events.NEW_GAME, (data: INewGameDTO) => this.service.START_NEW_GAME(socket, data));

    //move pieces
    socket.on(events.MOVE, (move: IMove) => {
      this.service.MOVE(socket, move);
    });

    //update clock
    socket.on(events.UPDATE_TIME, (roomId: string, updateTime: Function) => {
      this.service.UPDATE_TIME(roomId, updateTime);
    });
    //update geme position on reconect
    socket.on(events.UPDATE_GAME, (roomId: string, updateBoard: Function) =>
      this.service.UPDATE_GAME(roomId, updateBoard)
    );

    //chat message handling
    socket.on(events.CHAT_MESSAGE, (message: IChatMessage) => {
      this.service.HANDLE_CHAT_MESSAGE(socket, message);
    });

    //resign
    socket.on(events.RESIGNATION, (room: string) => this.service.RESIGNATION(socket, room));

    //draw offer events
    socket.on(events.DRAW_OFFER, (room: string) => this.service.DRAW_OFFER(socket, room));
    socket.on(events.DRAW_REJECT, (room: string) => this.service.DRAW_REJECT(socket, room));
    socket.on(events.DRAW_ACCEPT, (room: string) => this.service.DRAW_ACCEPT(socket, room));

    //handle disconection event
    socket.on(events.DISCONECT, () => {
      console.log(`user ${socket.id} disconected`);
    });
  };
}
export default GameController;
