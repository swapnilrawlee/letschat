import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    const socket = io("https://6f2d-124-66-175-241.ngrok-free.app");
    setSocket(socket);

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {

    //check username 
    if(username==="" )return alert("Please enter a username ....");
    
    // check message
    if(message==="" )return alert("Please enter a message ....");

    if (message.trim() && socket) {
      socket.emit("message", { text: message, sender: username });
      setMessage('');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Chat App</h1>
      <div className="flex flex-col w-full max-w-md bg-white border rounded-lg shadow-md overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === username ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${msg.sender === username ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              >
                <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4 bg-gray-200">
          <label className="block mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded-lg ml-2 w-full"
            />
          </label>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded-lg flex-1"
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
