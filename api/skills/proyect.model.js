const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
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
  skillName: {
    type: String,
    required: false,
    trim: true,
  },
  skillLink: {
    type: String,
    required: false,
    trim: true,
  },
  imageSkill: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Skill', SkillSchema);
