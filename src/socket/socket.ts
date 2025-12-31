import { io } from "socket.io-client";


const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3001";

const socket = io(SOCKET_URL, {
    autoConnect: false,
})

export default socket;