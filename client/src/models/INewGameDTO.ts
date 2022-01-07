export default interface INewGameDTO {
  roomID: string;
  clockParams: { initialTime: 10 | 3 | 1 | 5 | 15; increment: 0 | 1 | 5 | 10 };
}
