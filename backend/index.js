const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("offer", ({ room, offer }) => {
    io.to(room).emit("offer", offer);
  });

  socket.on("answer", ({ room, answer }) => {
    io.to(room).emit("answer", answer);
  });

  socket.on("iceCandidate", ({ room, iceCandidate }) => {
    io.to(room).emit("iceCandidate", iceCandidate);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
