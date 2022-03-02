const mongoose = require('mongoose');

const LogroSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  fecha: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Logros', LogroSchema);
