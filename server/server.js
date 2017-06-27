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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime(),
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime(),
  });
  socket.on('createMessage', (message) => {
    console.log('Message sent from client:', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime(),
    // });
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

module.exports = { app };
