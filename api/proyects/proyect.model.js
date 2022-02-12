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
  proyectName: {
    type: String,
    required: true,
    trim: true,
  },
  proyectType: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  startDate: {
    type: String,
    required: false,
    trim: true,
  },
  endDate: {
    type: String,
    required: true,
    trim: true,
  },
  linkDemo: {
    type: String,
    required: true,
    trim: true,
  },
  linkRepo: {
    type: Array,
    required: false,
  },
  imageProyect: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Proyect', ProyectSchema);
