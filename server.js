const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('paddleMove', (data) => {
        socket.broadcast.emit('paddleMove', data);
    });

    socket.on('ballUpdate', (data) => {
        socket.broadcast.emit('ballUpdate', data);
    });

    socket.on('scoreUpdate', (data) => {
        io.emit('scoreUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
