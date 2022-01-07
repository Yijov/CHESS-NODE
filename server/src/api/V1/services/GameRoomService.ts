import { Socket } from "socket.io";
import { IMove, IChatMessage, IMoveImput, INewGameDTO, GameRoom, IClockUpdateDTO } from "../models";
import events from "../enums/Events";
import CurrentGamesCache from "../persistnce/cache/CurrentGamesCache";
import { autoInjectable, singleton } from "tsyringe";

@autoInjectable()
@singleton()
class GameRoomService {
  constructor(private GamesCache: CurrentGamesCache) {}

  public JOIN_GAME(socket: Socket, roomId: string) {
    socket.join(roomId);
    //refresh the position on reconection
  }
  public HANDLE_CHAT_MESSAGE(socket: Socket, message: IChatMessage) {
    socket.broadcast.to(message.room).emit(events.CHAT_MESSAGE, message);
  }

  public UPDATE_GAME(roomId: string, updateBoard: Function) {
    const game = this.GamesCache.findById(roomId);
    if (game) {
      updateBoard(game);
    }
  }

  public UPDATE_TIME(roomId: string, updateTime: Function) {
    const game = this.GamesCache.findById(roomId);
    if (game) {
      const { increment, initialTime, whiteTime, blacktime, blackTurn } = game.clock;
      updateTime({ increment, initialTime, whiteTime, blacktime, blackTurn });
    }
  }

  public MOVE(socket: Socket, move: IMove) {
    const game = this.GamesCache.findById(move.room);
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
      game.clock.switchTurn();
      this.GamesCache.updateOne(game);
    }
    //emiting move to oponent
    socket.broadcast.to(move.room).emit(events.MOVE, movetoEmit);
  }

  public START_NEW_GAME(socket: Socket, data: INewGameDTO) {
    const game = this.GamesCache.findById(data.roomID);
    if (game) {
      this.GamesCache.updateOne(new GameRoom(game.roomId, game.clock.clockSettings));
    } else {
      this.GamesCache.addOne(
        new GameRoom(data.roomID, {
          initialTime: data.clockParams.initialTime,
          increment: data.clockParams.increment,
        })
      );
    }
    socket.broadcast.to(data.roomID).emit(events.NEW_GAME);
  }

  public RESIGNATION(socket: Socket, room: string) {
    const game = this.GamesCache.findById(room);
    if (game) {
      game.inProgress = false;
      game.gameOver = true;
      game.gameOverReason = "Player has resigned";
      this.GamesCache.updateOne(game);
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
    const game = this.GamesCache.findById(roomId);
    if (game) {
      game.inProgress = false;
      game.gameOver = true;
      game.gameOverReason = "Draw Agreed";
      this.GamesCache.updateOne(game);
      socket.broadcast.to(roomId).emit(events.DRAW_ACCEPT);
    }
  }
}

export default GameRoomService;
