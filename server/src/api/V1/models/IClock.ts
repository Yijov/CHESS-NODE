export default interface IClock {
  initialTime: 10 | 3 | 1 | 5 | 15; // minutes
  whiteTime: { minutes: number; seconds: number };
  blacktime: { minutes: number; seconds: number };
  increment: 0 | 1 | 5 | 10; // seconds
  blackTurn: boolean;
  clockSettings: { initialTime: 10 | 3 | 1 | 5 | 15; increment: 0 | 1 | 5 | 10 };
}
