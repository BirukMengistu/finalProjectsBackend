
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  authour: String,
  tittle: String,
  body: String,
  createdAt:Date,
  tag:[],
  userId:String

}, { timestamps: true })


module.exports = mongoose.model('Blog', blogSchema)