const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  name: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  avatar: {
    type: string,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema = Mongoose.model('UserSchema', true);
