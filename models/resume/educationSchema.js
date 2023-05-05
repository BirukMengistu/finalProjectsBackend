const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
  userId:    { type: String, required: true },
  institute:     { type: String, required: true, },
  program:    { type: String, required: true },
  startedAt:     { type: Date, required: false },
  endedAt:     { type: Date, required: false },

}, { timestamps: true })


module.exports = mongoose.model('Education', educationSchema)