require("dotenv").config();
import express, { Express } from "express";
import RestRouter from "../api/router/Router";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import ErrorHandler from "../errors/ErrorHandler";
import Constants from "../config/constanst";

export default class AppConfig {
  protected app: Express = express();
  constructor() {
    this.app.use(express.static(__dirname + "/public"));
    //this.app.use("/*", express.static(__dirname + "/public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(cors(Constants.corsOptions));
    this.app.use(cookieParser());
    this.app.use("/api", RestRouter);
    this.app.use("*", ErrorHandler.NotFoundRouteHandler);
    this.app.use(ErrorHandler.ExeptionHandler);
  }
}
