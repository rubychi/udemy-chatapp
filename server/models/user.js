let mongoose = require('mongoose');

let User = mongoose.model('User', {
  _id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  message: [{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  }],
  createdAt: [{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  }],
});

module.exports = { User };
