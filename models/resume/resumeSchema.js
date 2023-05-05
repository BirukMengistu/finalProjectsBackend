

const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
  
  summary:    { type: String, required: true },
  technical_Skil:     { type: [], required: false },
  hobby:     { type: [], required: false },
  language:     { type: [], required: true },
  userId:    { type: String, required: true },
  

}, { timestamps: true })


module.exports = mongoose.model('Resume', resumeSchema)