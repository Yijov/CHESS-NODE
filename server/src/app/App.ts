require("dotenv").config();
import http from "http";
import AppConfig from "./AppConfig";
import constants from "../config/constanst";
import { inject, injectable, singleton } from "tsyringe";
const socketIO = require("socket.io");
import GameController from "../api/V1/controllers/GameController";

@singleton()
@injectable()
export default class App extends AppConfig {
  //config web sockets
  private server = http.createServer(this.app);
  private IO: typeof socketIO = socketIO(this.server, { cors: constants.corsOptions });
  constructor(private GameController: GameController) {
    super();
  }

  public get App() {
    return this.app;
  }
  public start = async () => {
    this.IO.on("connection", this.GameController.connectionHandler);
    this.server.listen(constants.defaultPort, () => {
      console.log(`Application running on port ${constants.defaultPort}`);
    });
  };
}
