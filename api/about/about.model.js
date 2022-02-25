const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  userId: {
    //Tipo id
    type: mongoose.Schema.Types.ObjectId,
    //Referencia de donde sacara ese ID
    ref: 'User',
    // Revisar si se requiere o no
    required: false,
  },
  userName: {
    type: String,
    required: false,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  profession: {
    type: String,
    required: true,
    trim: true,
  },
  linkUsername: {
    type: String,
    required: false,
    trim: true,
  },
  aboutMeText: {
    type: String,
    required: true,
    trim: true,
  },
  interests: {
    type: String,
    required: true,
    trim: true,
  },
  socialNetworks: {
    type: Array,
    required: false,
  },
  photo: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('AboutMe', AboutSchema);
