export default interface IChatState {
  chat: {
    value: { message: string; thread: string[] };
  };
}
