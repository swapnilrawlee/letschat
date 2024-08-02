import React, { useEffect, useState } from 'react';
import './Homepage.css'; // Make sure to create this CSS file

const Homepage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:3030");
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
        if (username === "") return alert("Please enter a username ....");

        // check message
        if (message === "") return alert("Please enter a message ....");

        if (message.trim() && socket) {
            const timestamp = new Date().toLocaleTimeString();

            socket.emit("message", { text: message, sender: username ,timestamp });

            setMessage("");
        }
    };

    return (
        <div className="container">
            <h1 className="header">Chit-Chat</h1>
            <div className="chat-box">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${
                                msg.sender === username ? "sent" : "received"
                            }`}
                        >
                            <div className="message-content">
                                <div
                                    className={`message-text ${
                                        msg.sender === username
                                            ? "sent-text"
                                            : "received-text"
                                    }`}
                                >
                                    <strong>{msg.sender}: </strong> <span>{msg.text}</span>
                                </div>
                                <div className="timestamp">{msg.timestamp}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-section">
                    <label className="username-label">
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="username-input"
                        />
                    </label>
                    <div className="input-controls">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="message-input"
                        />
                        <button
                            onClick={sendMessage}
                            className="send-button"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
