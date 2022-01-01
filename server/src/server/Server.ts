import "reflect-metadata";
import { container } from "tsyringe";
import App from "../app/App";

const application = container.resolve(App);

export default application;
