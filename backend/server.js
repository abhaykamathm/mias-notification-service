// backend/server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 4000;

// Load messages from JSON file
const messages = JSON.parse(fs.readFileSync("messages.json", "utf8"));

// Function to emit messages in a loop
const emitMessages = () => {
  let index = 0;

  setInterval(() => {
    io.emit("notification", messages[index]);
    index = (index + 1) % messages.length;
  }, 1000); // Change interval as needed
};

// Initialize Socket.io
io.on("connection", (socket) => {
  console.log("New client connected");

  // Emit messages on client connection
  emitMessages();

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(cors()); // Enable CORS for all routes

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
