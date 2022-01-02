import io from "socket.io-client";
const severAddress = "http://localhost:3001";
const socket = io(severAddress);

export default socket;
