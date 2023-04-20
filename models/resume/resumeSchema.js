

const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
  
  personalInformation:     { type: String, required: true, },
  summary:    { type: String, required: true },
  technical_Skil:     { type: [], required: false },
  workExpriance:     { type: [], required: false },
  refefrence:     { type: [], required: false },
  education:     { type: [], required: true },
  projects:     { type: [], required: false },
  language:     { type: [], required: true },
  userId:    { type: String, required: true },
  image:    { type: String, required: true },

}, { timestamps: true })


module.exports = mongoose.model('Resume', resumeSchema)