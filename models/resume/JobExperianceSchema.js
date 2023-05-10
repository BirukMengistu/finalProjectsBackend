const mongoose = require('mongoose');

const JobExperianceSchema = mongoose.Schema({
  userId:    { type: String, required: true },
  company:     { type: String, required: true, },
  title:     { type: String, required: true, },
  responsibility:    { type: String, required: true },
  startedAt:     { type: Date, required: false },
  endedAt:     { type: Date, required: false },

}, { timestamps: true })


module.exports = mongoose.model('JobExperiance', JobExperianceSchema)


