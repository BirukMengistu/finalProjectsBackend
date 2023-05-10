

const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
  
  summary:    { type: String, required: true },
  technical_Skil:     { type: [], required: false },
  hobby:     { type: [], required: false },
  language:     { type: [], required: true },
  userId:    { type: String, required: true },
  github :{type:String ,require:false},
  linkden :{type:String ,require:false},
  youtube :{type:String ,require:false},
  profileImg :{type:String ,require:false},

}, { timestamps: true })


module.exports = mongoose.model('Resume', resumeSchema)