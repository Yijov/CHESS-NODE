import { autoInjectable, singleton } from "tsyringe";
import { GameRoom } from "../../models";
@autoInjectable()
@singleton()
class CurrentGamesCache {
  constructor() {
    //activate the clock
    setInterval(() => this.updateCloclcks(), 1000);
  }
  private current_games_Repo: GameRoom[] = [];

  private updateCloclcks = () => {
    this.current_games_Repo.forEach((game) => {
      if (game.inProgress) {
        game.clock.decrement();
      }
    });
  };

  public getAll = () => {
    return this.current_games_Repo;
  };

  public findById = (id: string) => {
    return this.current_games_Repo.find((game: GameRoom) => game.roomId === id);
  };

  public addOne = (room: GameRoom) => {
    return this.current_games_Repo.push(room);
  };

  public updateOne = async (room: GameRoom) => {
    //validate if room exists
    let roomtobeUpdated = await this.current_games_Repo.find(
      (game: GameRoom) => game.roomId === room.roomId
    );
    //if ecists, filter out the old one from the array
    if (roomtobeUpdated !== undefined) {
      let filtered = await this.current_games_Repo.filter(
        (roomObject: GameRoom) => roomObject.roomId !== room.roomId
      );
      this.current_games_Repo = filtered;
    }
    //if dosnt exist thn push the new one
    this.current_games_Repo.push(room);
    return;
  };

  public removeOne = async (room: GameRoom) => {
    //validate if room exists
    let roomtobeUpdated = await this.current_games_Repo.find(
      (game: GameRoom) => game.roomId === room.roomId
    );
    //if ecists, filter out the old one from the array
    if (roomtobeUpdated !== undefined) {
      let filtered = await this.current_games_Repo.filter(
        (roomObject: GameRoom) => roomObject.roomId !== room.roomId
      );
      this.current_games_Repo = filtered;
    }
    return;
  };
}
export default CurrentGamesCache;
