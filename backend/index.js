const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const morgan = require("morgan");
const { ExpressPeerServer } = require("peer");
const connection = require("./config/DB");
const userRoute = require("./routes/user.routes");
const historyRoute = require("./routes/callHistory.routes");
const feedBackRoute = require("./routes/feedback.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/auth", userRoute);
app.use("/call", historyRoute);
app.use("/feedback", feedBackRoute);

io.on("connection", (socket) => {
  console.log("User Connected" + socket.id);

  socket.on("join", (roomName) => {
    let rooms = io.sockets.adapter.rooms;
    console.log("User joined room:", roomName);
    console.log(rooms);

    if (!rooms[roomName]) {
      socket.join(roomName);
      console.log("Room Created");
    } else if (rooms[roomName].length === 1) {
      socket.join(roomName);
      console.log("User joined room:", roomName);
    } else {
      console.log("Room Full");
    }
  });

  // Handler for ready event
  socket.on("ready", () => {
    console.log("Ready");
    // Access roomName from socket object
    const roomName = Object.keys(socket.rooms)[1]; // Get the second room (the first is always the socket's own room)
    socket.to(roomName).emit("ready");
  });

  // Handler for candidate event
  socket.on("candidate", (candidate, roomName) => {
    console.log("Candidate");
    console.log(candidate);
    socket.to(roomName).emit("candidate", candidate, roomName);
  });

  // Handler for offer event
  socket.on("offer", (offer, roomName) => {
    console.log("offer");
    console.log(offer);
    socket.to(roomName).emit("offer", offer, roomName);
  });

  // Handler for answer event
  socket.on("answer", (answer, roomName) => {
    console.log("answer");
    console.log(answer);
    socket.to(roomName).emit("answer", answer, roomName);
  });
});
// Start the server
server.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
  console.log(`Server is running on port ${PORT}`);
});
