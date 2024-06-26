// frontend/src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");
// const socket = io("https://mias-notification-service.onrender.com");

function App() {
  const [notification, setNotification] = useState({
    message: "Hello! This is a notification message.",
    dateTime: "6 May 2024, 16:12:58",
  });
  const [museoNotification, setMuseoNotification] = useState({
    message: "Hello! This is a notification message.",
    dateTime: "6 May 2024, 16:12:58",
  });

  useEffect(() => {
    // Listen for notifications from the server
    socket.on("notification", (data) => {
      // console.log(data);
      setNotification((prevNotification) => data);
    });

    socket.on("museo_notification", (data) => {
      // console.log(data);
      setMuseoNotification((prevNotification) => data);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <nav className="p-[1vw] px-[1.5vw] m-[1vw] text-[2vw] text-[#fff] font-[700] bg-[#76885B] rounded-[1vw]">
        MIAs Notification Service
      </nav>
      {/* Notifications Grid */}
      <div className="p-[1vw] grid grid-cols-3 gap-[1vw]">
        {/* Aegis Card */}
        <div className="p-[1vw] flex flex-col gap-[0.5vw] rounded-[1vw] bg-[#76885B]">
          <span className="text-[white] text-[2vw] font-[500]">Aegis</span>
          <div className="p-[0.5vw] flex flex-col gap-[1vw] bg-[white] rounded-[0.75vw]">
            <div className="text-[1.5vw]">Message : {notification.message}</div>
            <span className="text-[1vw] font-[500] text-[#ab5037]">
              {notification.dateTime}
            </span>
          </div>
        </div>
        {/* Museo Card */}
        <div className="p-[1vw] flex flex-col gap-[0.5vw] rounded-[1vw] bg-[#76885B]">
          <span className="text-[white] text-[2vw] font-[500]">Museo</span>
          <div className="p-[0.5vw] flex flex-col gap-[1vw] bg-[white] rounded-[0.75vw]">
            <div className="text-[1.5vw]">
              Message : {museoNotification.message}
            </div>
            <div className="text-[1.5vw]">Type : {museoNotification.type}</div>
            <span className="text-[1vw] font-[500] text-[#ab5037]">
              {museoNotification.dateTime}
            </span>
          </div>
        </div>
        {/* iZAK Card */}
        <div className="p-[1vw] flex flex-col gap-[0.5vw] rounded-[1vw] bg-[#76885B]">
          <span className="text-[white] text-[2vw] font-[500]">iZAK</span>
          <div className="p-[0.5vw] flex flex-col gap-[1vw] bg-[white] rounded-[0.75vw]">
            <div className="text-[1.5vw]">Message : {notification.message}</div>
            <span className="text-[1vw] font-[500] text-[#ab5037]">
              {notification.dateTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
