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
const museo_notifications = require("./data/museo_notifications.json");
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

const emitMuseoNotifications = () => {
  let index = 0;

  setInterval(() => {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
    const messageWithDateTime = {
      message: museo_notifications[index].message,
      type: museo_notifications[index].type,
      dateTime: formattedDateTime,
    };
    io.emit("museo_notification", messageWithDateTime);
    console.log("Emitted");
    index = (index + 1) % museo_notifications.length;
  }, 5000); // Change interval as needed
};

app.use(cors()); // Enable CORS for all routes

server.listen(PORT, () => {
  emitMessages();
  emitMuseoNotifications();
  console.log(`Server listening on port ${PORT}`);
});
