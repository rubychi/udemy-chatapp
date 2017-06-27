require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
// const bodyParser = require('body-parser');
// const { ObjectID } = require('mongodb');
// const _ = require('lodash');
// const bcrypt = require('bcryptjs');

// const { mongoose } = require('./db/mongoose');
// const { User } = require('./models/user');
// const { authenticate } = require('./middleware/authenticate');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;

// app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  socket.on('createMessage', (message, callback) => {
    console.log('Message sent from client:', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
    // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

module.exports = { app };
