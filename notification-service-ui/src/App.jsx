// frontend/src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to your backend server

function App() {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Listen for notifications from the server
    socket.on("notification", (data) => {
      setNotification(data);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Notifications</h1>
      <div>{notification}</div>
    </div>
  );
}

export default App;
