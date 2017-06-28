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
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;
let users = new Users();

/* [Usage]
 * // Send an event to everybody in the room 'The Office Fans'
 * io.emit -> io.to('The Office Fans').emit
 * // Send an event to everybody in the room 'The Office Fans' except for the current user
 * socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
 * // Send an event to specific user
 * socket.emit
 */

// app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    // Remove the user from previous room (if have one)
    users.removeUser(socket.io);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
  socket.on('createMessage', (message, callback) => {
    console.log('Message sent from client:', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

module.exports = { app };
