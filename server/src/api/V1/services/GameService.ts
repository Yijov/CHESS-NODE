import { Socket } from "socket.io";
import { IMove, IChatMessage, IMoveImput } from "../models";
import events from "../enums/Events";
import GamesCache from "../persistnce/cache/CurrentGamesCache";

class GameService {
  constructor() {}
  public JOIN_GAME(socket: Socket, roomId: string) {
    socket.join(roomId);
    //refresh the position on reconection
  }
  public HANDLE_CHAT_MESSAGE(socket: Socket, message: IChatMessage) {
    socket.broadcast.to(message.room).emit(events.CHAT_MESSAGE, message);
  }

  public MOVE(socket: Socket, move: IMove) {
    const game = GamesCache.findById(move.room);
    //translate to in order to send to the other player
    let movetoEmit: IMoveImput = {
      targetSquare: move.targetSquare,
      sourceSquare: move.sourceSquare,
      piece: move.piece,
    };
    //updating game cache
    //if game already exists
    if (game) {
      game.moves.push(movetoEmit);
      game.currentPosition = move.newfen;
      GamesCache.updateOne(game);
    } else {
      //if game is new
      GamesCache.updateOne({
        roomId: move.room,
        currentPosition: move.newfen,
        moves: [movetoEmit],
      });
    }

    //emiting move to oponent
    socket.broadcast.to(move.room).emit(events.MOVE, movetoEmit);
  }

  public UPDATE_GAME(socket: Socket, roomId: string, updateBoard: Function) {
    const game = GamesCache.findById(roomId);
    if (game) {
      updateBoard(game.moves);
    }
  }

  public START_NEW_GAME(socket: Socket) {
    console.log("New Game");
  }
}

export default new GameService();
