const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
  photo: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', UserSchema);
