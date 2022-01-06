import { Socket } from "socket.io";
import { IMove, IChatMessage, IMoveImput } from "../models";
import events from "../enums/Events";
import GamesCache from "../persistnce/cache/CurrentGamesCache";

class GameRoomService {
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
        inProgress: true,
        gameOver: false,
        gameOverReason: undefined,
      });
    }

    //emiting move to oponent
    socket.broadcast.to(move.room).emit(events.MOVE, movetoEmit);
  }

  public UPDATE_GAME(socket: Socket, roomId: string, updateBoard: Function) {
    const game = GamesCache.findById(roomId);
    if (game) {
      updateBoard(game);
    }
  }

  public START_NEW_GAME(socket: Socket, room: string) {
    const game = GamesCache.findById(room);
    if (game) {
      GamesCache.updateOne({
        roomId: room,
        currentPosition: "start",
        moves: [],
        inProgress: true,
        gameOver: false,
        gameOverReason: undefined,
      });
    }
    socket.broadcast.to(room).emit(events.NEW_GAME);
  }

  public RESIGNATION(socket: Socket, room: string) {
    const game = GamesCache.findById(room);
    if (game) {
      GamesCache.updateOne({
        roomId: room,
        currentPosition: game.currentPosition,
        moves: game.moves,
        inProgress: false,
        gameOver: true,
        gameOverReason: "Player has resigned",
      });
      socket.broadcast.to(room).emit(events.RESIGNATION);
    }
  }

  public DRAW_OFFER(socket: Socket, roomId: string) {
    socket.broadcast.to(roomId).emit(events.DRAW_OFFER);
  }

  public DRAW_REJECT(socket: Socket, roomId: string) {
    socket.broadcast.to(roomId).emit(events.DRAW_REJECT);
  }

  public DRAW_ACCEPT(socket: Socket, roomId: string) {
    const game = GamesCache.findById(roomId);
    if (game) {
      GamesCache.updateOne({
        roomId: roomId,
        currentPosition: game.currentPosition,
        moves: game.moves,
        inProgress: false,
        gameOver: true,
        gameOverReason: "Draw Agreed",
      });
      socket.broadcast.to(roomId).emit(events.DRAW_ACCEPT);
    }
  }
}

export default new GameRoomService();
