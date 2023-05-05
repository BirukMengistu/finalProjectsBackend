
const mongoose = require('mongoose');
const referenceSchema = mongoose.Schema({
    userId:    { type: String, required: true },
    title:     { type: String, required: true, },
    company:     { type: String, required: true, },
    firstName:    { type: String, required: true },
    lastName:    { type: String, required: true },
    email:     { type: String, required: true, },
    telephone:     { type: String, required: true, }
  
  }, { timestamps: true })
  
  
  module.exports = mongoose.model('Reference', referenceSchema)