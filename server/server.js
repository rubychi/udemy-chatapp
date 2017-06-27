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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

module.exports = { app };
