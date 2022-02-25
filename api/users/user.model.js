const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  userName: {
    type: String,
    required: false,
    trim: true,
    default: 'undefined',
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  roles: {
    admin: Boolean,
  },
  socialNetworks: {
    type: Array,
    required: false,
  },
  picture: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', UserSchema);
