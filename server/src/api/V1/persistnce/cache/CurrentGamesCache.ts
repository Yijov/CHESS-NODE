import IGameRoom from "../../models/IGameRoom";

class CurrentGamesCache {
  private current_games_Repo: IGameRoom[] = [];

  public getAll = () => {
    return this.current_games_Repo;
  };

  public findById = (id: string) => {
    return this.current_games_Repo.find((game: IGameRoom) => game.roomId === id);
  };

  public addOne = (room: IGameRoom) => {
    return this.current_games_Repo.push(room);
  };

  public updateOne = async (room: IGameRoom) => {
    //validate if room exists
    let roomtobeUpdated = await this.current_games_Repo.find(
      (game: IGameRoom) => game.roomId === room.roomId
    );
    //if ecists, filter out the old one from the array
    if (roomtobeUpdated !== undefined) {
      let filtered = await this.current_games_Repo.filter(
        (roomObject: IGameRoom) => roomObject.roomId !== room.roomId
      );
      this.current_games_Repo = filtered;
    }
    //if dosnt exist thn push the new one
    this.current_games_Repo.push(room);
    return;
  };

  public removeOne = async (room: IGameRoom) => {
    //validate if room exists
    let roomtobeUpdated = await this.current_games_Repo.find(
      (game: IGameRoom) => game.roomId === room.roomId
    );
    //if ecists, filter out the old one from the array
    if (roomtobeUpdated !== undefined) {
      let filtered = await this.current_games_Repo.filter(
        (roomObject: IGameRoom) => roomObject.roomId !== room.roomId
      );
      this.current_games_Repo = filtered;
    }
    return;
  };
}
export default new CurrentGamesCache();
