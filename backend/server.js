// backend/server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

const messages = require("./messages.json");
const PORT = process.env.PORT || 4000;

const formatDateTime = (date) => {
  return date.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Function to emit messages in a loop
const emitMessages = (socket) => {
  let index = 0;

  setInterval(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    const messageWithDateTime = {
      message: messages[index],
      dateTime: formattedDateTime,
    };
    socket.broadcast.emit("startNotifications", messageWithDateTime);
    index = (index + 1) % messages.length;
  }, 5000); // Change interval as needed
};

// Initialize Socket.io
io.on("connection", (socket) => {
  console.log("New client connected");

  // Emit messages on client connection
  socket.once("startNotifications", () => {
    emitMessages(socket);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(cors()); // Enable CORS for all routes

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
