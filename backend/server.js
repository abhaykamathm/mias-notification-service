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
const emitMessages = () => {
  let index = 0;

  setInterval(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    const messageWithDateTime = {
      message: messages[index],
      dateTime: formattedDateTime,
    };
    io.emit("notification", messageWithDateTime);
    console.log("Emitted");
    index = (index + 1) % messages.length;
  }, 5000); // Change interval as needed
};

app.use(cors()); // Enable CORS for all routes

server.listen(PORT, () => {
  emitMessages();
  console.log(`Server listening on port ${PORT}`);
});
