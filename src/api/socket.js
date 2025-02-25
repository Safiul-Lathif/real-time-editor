import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("editorChange", (data) => {
      socket.broadcast.emit("editorUpdate", data); // Broadcast to other clients
    });
  });

  console.log("Socket server started");
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
