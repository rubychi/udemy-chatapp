require('./config/config');
const express = require('express');
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
const port = process.env.PORT;

// app.use(bodyParser.json());
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

module.exports = { app };
