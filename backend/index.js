// backend/index.js or server.js

const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join", (roomName) => {
    console.log("Joining room:", roomName);
    let rooms = io.sockets.adapter.rooms;
    console.log(rooms);
    let room = rooms.get(roomName);
    if (room === undefined) {
      socket.join(roomName);
      socket.emit("created");
    } else if (room.size === 1) {
      socket.join(roomName);
      socket.emit("joined");
    } else {
      socket.emit("full");
    }
  });

  socket.on("ready", (roomName) => {
    console.log("Ready event received for room:", roomName);
    socket.broadcast.to(roomName).emit("ready");
  });
  socket.on("candidate", (candidate, roomName) => {
    console.log("Candidate");
    console.log(candidate);
    socket.broadcast.to(roomName).emit("candidate", candidate);
  });
  socket.on("offer", (offer, roomName) => {
    console.log("Offer");

    socket.broadcast.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    console.log("Answer");
    socket.broadcast.to(roomName).emit("answer", answer);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
