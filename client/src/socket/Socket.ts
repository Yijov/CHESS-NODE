import io from "socket.io-client";
import app_constants from "../constants/constants";
const severAddress = app_constants.APP_URL;
const socket = io(severAddress);

export default socket;
