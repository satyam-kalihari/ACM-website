import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"]
    }
})

io.on("connection", (socket) => {

    console.log("Connected:", socket.id)

    socket.on("send-message", (data) => {
        io.to(data.roomId).emit("room-message",{ author: data.author, message: data.msg })
    })

    socket.on("join-room", (room) => {
        try {
            for (const socketRoom of socket.rooms) {
                if (socketRoom !== socket.id){
                    socket.leave(socketRoom)
                }
            }

            socket.join(room._id)
            socket.emit("joined-successfully", { success: true, msg: "joined succesfully", room })
        } catch (e) {
            socket.emit("failed-to-join", { success: false, msg: "Payload is invalid", room })
        }
    })

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id)
    })

})

httpServer.listen(3001, () => {
    console.log("Websocket server has started")
})