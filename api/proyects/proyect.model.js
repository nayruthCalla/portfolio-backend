const mongoose = require('mongoose');

const ProyectSchema = new mongoose.Schema({
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
  proyectName: {
    type: String,
    required: false,
    trim: true,
  },
  level: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  startDate: {
    type: String,
    required: false,
    trim: true,
  },
  techFirst: {
    type: String,
    required: false,
    trim: true,
  },
  techSecond: {
    type: String,
    required: false,
    trim: true,
  },
  links: {
    type: Array,
    required: false,
  },
  imageProyect: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Proyect', ProyectSchema);
