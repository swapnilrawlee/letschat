const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config(); // For environment variables

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(helmet()); // Adds security headers

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Broadcast message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

// Start server
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
