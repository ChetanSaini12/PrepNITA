const express = require("express");
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const http=require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const allowedOrigin="*";
const io = new Server(server)
const userSocketMap = {};
const PORT=process.env.PORT || 6000;

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
};

io.on('connection', (socket) => {

  console.log('socket id generation',socket.id);

  socket.on("join-room", ({ roomId, userName ,peerID}) => {

    userSocketMap[socket.id] = userName;

    socket.join(roomId);

    console.log('join-room',userName);

    const updatedClients = getAllConnectedClients(roomId);

    updatedClients.forEach(({ socketId }) => {
      io.to(socketId).emit("user-connected", {
        clients: updatedClients,
        userName,
        socketId:socket.id,
        peerID
  
      });
    });

    socket.to(roomId).emit('user-connected',({peerID,clients:updatedClients,socketId:socket.id,userName}))

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];

      rooms.forEach((roomId) => {
        socket.in(roomId).emit("user-disconnected", {
          socketId: socket.id,
          userName: userSocketMap[socket.id],
          peerID
        });
      });

      delete userSocketMap[socket.id];

      socket.leave();
    });
  });
// hello
  socket.on('change',({roomId,code})=>{
    socket.in(roomId).emit('change',{code});

  })
  socket.on("codesync", ({code,socketId}) => {
    io.to(socketId).emit("change", { code });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
