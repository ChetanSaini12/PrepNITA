const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const allowedOrigin = "*";
const io = new Server(server);
const userSocketMap = {};
const PORT = process.env.PORT || 6000;

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket id generation", socket.id);

  socket.on("join-room", ({ roomId, username, peerID }) => {
    userSocketMap[socket.id] = username;

    socket.join(roomId);

    console.log("join-room", username);

    const updatedClients = getAllConnectedClients(roomId);

    updatedClients.forEach(({ socketId }) => {
      io.to(socketId).emit("user-connected", {
        clients: updatedClients,
        username,
        socketId: socket.id,
        peerID,
      });
    });

    socket.to(roomId).emit("user-connected", {
      peerID,
      clients: updatedClients,
      socketId: socket.id,
      username,
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];

      rooms.forEach((roomId) => {
        socket.in(roomId).emit("user-disconnected", {
          socketId: socket.id,
          username: userSocketMap[socket.id],
          peerID,
        });
      });

      delete userSocketMap[socket.id];

      socket.leave();
    });
  });
  // hello
  socket.on("change", ({ roomId, code }) => {
    socket.in(roomId).emit("change", { code });
  });
  socket.on("codesync", ({ code, socketId }) => {
    io.to(socketId).emit("change", { code });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
