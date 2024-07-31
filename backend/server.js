const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'https://lets-chat-eight-plum.vercel.app',
        credentials: true
    }
));

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

app.get('/', (req, res) => {
    return res.send('Hello from the server');
});

server.listen(3030, () => {
    console.log('Server is running on port 3030');
});
