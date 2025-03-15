const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle new_image event
    socket.on('new_image', (data) => {
        console.log('Received new image');
        io.emit('new_image', data); // Broadcast the image to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});