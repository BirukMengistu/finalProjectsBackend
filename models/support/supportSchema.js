
const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message:String,
 


}, { timestamps: true })


module.exports = mongoose.model('Support', supportSchema)