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
  skillName: {
    type: String,
    required: true,
    trim: true,
  },
  skillLink: {
    type: String,
    required: true,
    trim: true,
  },
  imageSkill: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Skill', SkillSchema);
