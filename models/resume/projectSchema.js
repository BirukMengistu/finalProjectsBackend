const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  
  project_title:     { type: String, required: true, },
  summary:    { type: String, required: true },
  userId:    { type: String, required: true },
  my_role:     { type: String, required: false },
  startedAt:     { type:Date , required: false },
  endedAt:     { type: Date, required: false },

}, { timestamps: true })


module.exports = mongoose.model('Project', projectSchema)