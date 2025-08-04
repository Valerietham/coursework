// Documantation: https://socket.io/get-started/chat

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // logging connection event
  console.log('A user connected');
  io.emit('connection', 'A user connected');
  // logging disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // sending message to all users
  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000/');
});
